import time
import random
# from processor import process_documents_bundle
from redis import Redis
from pottery import Redlock
from pottery.exceptions import ReleaseUnlockedLock
import os
from PyPDF2 import PdfReader, PdfWriter
from io import BytesIO
import boto3
import json

from extractors import ExpensesCreator, ExtractorsManager
from indexer import Indexer


def process_documents_bundle(documents_bundle_url):
    print(f'started process_document_bundle: {documents_bundle_url}')
    for _ in range(3):
        print('#'*100)

    custom_fields_conf = _load_custom_fields_conf()
    extracted_documents = ExtractorsManager(documents_bundle_url, custom_fields_conf).extract()

    indices = [i for i in range(len(documents_bundle_url)) if documents_bundle_url[i] == '/']
    customer_id = documents_bundle_url[indices[2] + 1: indices[3]]

    redis = Redis.from_url('redis://cache:6379/0')
    customer_lock = Redlock(key=customer_id, masters={redis}, auto_release_time=5*60)
    try:
        with customer_lock:
            Indexer().index(customer_id, documents_bundle_url, extracted_documents)

    except ReleaseUnlockedLock:
        print(f'Released unlocked lock for key: {customer_id} of url: {documents_bundle_url}')

    print(f'ended process_document_bundle: {documents_bundle_url}')


def _load_custom_fields_conf():
    conf = {}
    for conf_name in ['PURCHASE_ORDER', 'PACKING_SLIP', 'QUOTE', 'INVOICE']:
        try:
            with open(f'/data/custom_fields/{conf_name}.json') as f:
                conf_cont = f.read()
                conf[conf_name] = json.loads(conf_cont)

            print(f'Loaded custom_fields_conf for doctype: {conf_name}')
        except Exception as e:
            print(f'No custom_fields_conf for doctype: {conf_name}')

    print(f'Final custom_fields_conf: {conf}')
    return conf

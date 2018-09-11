from os import environ

STORAGE_PROVIDER = environ.get('LOKOLE_STORAGE_PROVIDER', 'AZURE_BLOBS')
BLOBS_ACCOUNT = environ.get('LOKOLE_EMAIL_SERVER_AZURE_BLOBS_NAME', '')
BLOBS_KEY = environ.get('LOKOLE_EMAIL_SERVER_AZURE_BLOBS_KEY', '')
TABLES_ACCOUNT = environ.get('LOKOLE_EMAIL_SERVER_AZURE_TABLES_NAME', '')
TABLES_KEY = environ.get('LOKOLE_EMAIL_SERVER_AZURE_TABLES_KEY', '')

CLIENT_STORAGE_ACCOUNT = environ.get('LOKOLE_CLIENT_AZURE_STORAGE_NAME', '')
CLIENT_STORAGE_KEY = environ.get('LOKOLE_CLIENT_AZURE_STORAGE_KEY', '')

QUEUES_NAMESPACE = environ.get('LOKOLE_EMAIL_SERVER_QUEUES_NAMESPACE', '')
QUEUES_SAS_NAME = environ.get('LOKOLE_EMAIL_SERVER_QUEUES_SAS_NAME', '')
QUEUES_SAS_KEY = environ.get('LOKOLE_EMAIL_SERVER_QUEUES_SAS_KEY', '')

EMAIL_SENDER_KEY = environ.get('LOKOLE_SENDGRID_KEY', '')

LOG_LEVEL = environ.get('LOKOLE_LOG_LEVEL', 'DEBUG')
QUEUE_ERROR_FILE = environ.get('LOKOLE_QUEUE_ERROR_FILE', '')

APPINSIGHTS_KEY = environ.get('LOKOLE_EMAIL_SERVER_APPINSIGHTS_KEY', '')

MAX_WIDTH_IMAGES = int(environ.get('MAX_WIDTH_EMAIL_IMAGES', '200'))
MAX_HEIGHT_IMAGES = int(environ.get('MAX_HEIGHT_EMAIL_IMAGES', '200'))

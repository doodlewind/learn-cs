# Usage: python upload.py FILE_NAME

import os
import time
import sys
from requests import get, post
from requests.auth import HTTPBasicAuth

PATH = os.path.dirname(os.path.realpath(__file__))
CLOUD_URL = 'http://cloud.openshot.org'
CLOUD_AUTH = HTTPBasicAuth('demo-cloud', 'demo-password')
FILE_NAME = sys.argv[1]

# Get list of projects
end_point = '/projects/'
r = get(CLOUD_URL + end_point, auth=CLOUD_AUTH)
# print(r.json())

project_id = r.json().get("results")[0].get("id")
project_url = r.json().get("results")[0].get("url")


# Upload files to project
end_point = '/projects/%s/files/' % project_id
source_path = os.path.join(PATH, FILE_NAME)
source_name = os.path.split(source_path)[1]
file_data = {
    "media": None,
    "project": project_url,
    "json": "{}"
}
# print(file_data)

r = post(CLOUD_URL + end_point,
         data=file_data,
         files={"media": (source_name, open(source_path, "rb"))},
         auth=CLOUD_AUTH)
file_url = r.json().get("url")
print(r.json())

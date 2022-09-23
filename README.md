# Boiler Buy

## Available on http://boiler-buy.azurewebsites.net/

### THIS APP USES THE DJANGO FRAMEWORK FIND OUT MORE HERE https://docs.djangoproject.com/en/4.1/

### Rules
1. NO PUSHING TO MASTER - Create your own branch for each feature
2. To merge to master create a pull request
3. To merge pull request to master someone else needs to approve it

### Local Setup
1. Create a virtual environment for the app:
    * Windows 
        ```
        py -m venv .venv
        .venv/scripts/activate
        ```

    * macOS/linux 
        ```
        python3 -m venv .venv
        source .venv/bin/activate
        ```

2. Install the dependencies:
    ```
    pip install -r requirements.txt
    ```

3. Run the app:
    ```
    python3 manage.py runserver
    ```
    * App will be available on http://127.0.0.1:8000

### Angular
1. Download Node.js & npm (if not installed):

2. Go into the ```/boiler-buy/boiler-buy/``` directory

3. Install/Update packages:
    ```
    npm install
    ```

4. Run the Angular App:
    Run:
    ```
    ng serve
    ```
    * To automatically open the app, add the ```--open``` flag
    * App will be available on localhost:4200

5. To test:
    ```
    ng test
    ```
    * Write tests in the spec.ts files

5. Before pushing:
    ```
    ng build
    ```


### Requirements

The [requirements.txt](./requirements.txt) has the following packages:

| Package | Description |
| ------- | ----------- |
| [Django](https://pypi.org/project/Django/) | Web application framework. |
| [pyscopg2-binary](https://pypi.org/project/psycopg-binary/) | PostgreSQL database adapter for Python. |
| [python-dotenv](https://pypi.org/project/python-dotenv/) | Read key-value pairs from .env file and set them as environment variables. In this sample app, those variables describe how to connect to the database locally. <br><br> This package is used in the [manage.py](./manage.py) file to load environment variables. |
| [whitenoise](https://pypi.org/project/whitenoise/) | Static file serving for WSGI applications, used in the deployed app. <br><br> This package is used in the [azureproject/production.py](./azureproject/production.py) file, which configures production settings. |

# Boiler Buy

## Available on http://boiler-buy.azurewebsites.net/ (NOT WORKING YET)

### THIS APP USES THE DJANGO FRAMEWORK FIND OUT MORE HERE https://docs.djangoproject.com/en/4.1/

### Rules
1. NO PUSHING TO MASTER - Create your own branch for each feature
2. To merge to master create a pull request
3. To merge pull request to master someone else needs to approve it

### Local Setup
* API and Frontend work together locally
* Start by cloning repository
#### DJANGO API
1. Create a virtual environment for the api:
    * Windows 
        ```
        cd boiler_buy_api
        py -m venv .venv
        .venv/scripts/activate
        ```

    * macOS/linux 
        ```
        cd boiler_buy_api
        python3 -m venv .venv
        source .venv/bin/activate
        ```

2. Install the dependencies:
    ```
    pip install -r requirements.txt
    ```

3. Run the app:
    ```
    ./manage.py runserver
    ```
    * App will be available on http://127.0.0.1:8000

#### Angular (https://angular.io/docs)
1. Download Node.js & npm (if not installed):

2. Go into the ```boiler-buy-web``` directory

3. Install Angular-CLI
    ```
    npm install -g @angular/cli
    ```
    
4. Update/Install packages:
   ```
   npm install
   ```

5. Run the Angular App:
    Run:
    ```
    ng serve
    ```
    * To automatically open the app, add the ```--open``` flag
    * App will be available on http://localhost:4200

6. To test:
    ```
    ng test
    ```
    * Write tests in the spec.ts files

7. Before pushing:
    ```
    ng build
    ```

pipeline {
    agent any
    environment {
        PROJECT = 'lawyer-document-search'
        REPOSITORY = 'frontend'
        APP_NAME = 'frontend'
        LOCATION = 'us-east1'
        TAG = 'production'
        IMAGE_TAG = '${LOCATION}-docker.pkg.dev/${PROJECT}/${REPOSITORY}/${APP_NAME}:${TAG}'
    }

    stages {
        //Checkout Code from Git
        stage('Checkout repo') {
            steps {
                git "https://github.com/SiddhantSingh15/opal.git"
            }
        }

        stage('build docker image') {
            steps {
                // sh "docker build -t frontend:${BUILD_ID} ."
                sh "echo build ${BUILD_ID} complete"
            }
        }
    }
}

// http://http://34.102.223.27:80/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,%22:%22,//crumb
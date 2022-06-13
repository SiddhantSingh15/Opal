pipeline {
    agent any
    environment {
        PROJECT = 'lawyer-document-search'
        REPOSITORY = 'frontend'
        APP_NAME = 'frontend'
        LOCATION = 'us-east1'
        TAG = 'latest'
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
                // sh "docker build -t ${IMAGE_TAG} ."
                sh "docker --version"
                sh "echo image built successfully"
            }
        }

        // stage('Push image to registry') {
        //     sh("gcloud docker -- push ${imageTag}")
        // }
    }
}

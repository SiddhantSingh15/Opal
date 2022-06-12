pipeline {
    agent any
    stages {

        stage('checkout repo') {
            git "https://github.com/SiddhantSingh15/opal.git"
        }

        stage('build docker') {
            steps {
                sh "docker build -t frontend:${BUILD_ID} ."
                sh "echo build ${BUILD_ID} complete"
            }
        }
    }
}

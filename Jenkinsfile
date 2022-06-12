pipeline {
    agent any
    stages {

        stage('Initialize') {
            def dockerHome = tool 'docker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }


        stage('checkout repo') {
            steps {
                git "https://github.com/SiddhantSingh15/opal.git"
            }
        }

        stage('build docker') {
            steps {
                sh "docker build -t frontend:${BUILD_ID} ."
                sh "echo build ${BUILD_ID} complete"
            }
        }
    }
}

node {
    def newImage

    stage('Clone Repo') {
        checkout scm
    }

    stage('Build Repo') {
        newImage = docker.build("us-east1-docker.pkg.dev/lawyer-document-search/frontend/frontend")
    }
    
    stage('Push Image') {
        newImage.push()
    }
}
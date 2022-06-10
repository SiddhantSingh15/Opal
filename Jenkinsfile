node {
    def newImage

    stage('Clone Repo') {
        checkout scm
    }

    stage('Build Repo') {
        newImage = docker.build("frontend", "./")
    }
    
    stage('Push Image') {
        newImage.push()
    }
}

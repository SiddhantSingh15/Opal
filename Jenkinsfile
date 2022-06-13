pipeline {
  agent {
    kubernetes {
      label 'jenkins-pod'  // all your pods will be named with this prefix, followed by a unique id
      idleMinutes 4  // how long the pod will live after no jobs have run on it
      yamlFile 'build-pod.yaml'  // path to the pod definition relative to the root of our project 
      defaultContainer 'maven'  // define a default container if more than a few stages use it, will default to jnlp container
    }
  }
  stages {
    stage('check docker version') {
      steps {
        container('gcloud') {  
          sh "echo $(gcloud version)"  // when we run docker in this step, we're running it via a shell on the docker build-pod container, 
        }
      }
    }
  }
}

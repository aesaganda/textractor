pipeline {
    agent any
    environment {
        dockerHome = tool 'Dockins'
        PATH = "${dockerHome}/bin:${env.PATH}"
        REGISTRY = 'ghcr.io'
        IMAGE_NAME = "${env.GITHUB_REPOSITORY}"
    }
    stages {
        stage('Initialize'){
            }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build and push Docker image') {
            steps {
                script {
                    sh 'docker buildx create --use --name multiarch'
                    sh 'docker buildx build --platform linux/amd64,linux/arm64 -t ${REGISTRY}/${IMAGE_NAME}:${env.GIT_COMMIT} -t ${REGISTRY}/${IMAGE_NAME}:latest --push .'
                }
            }
        }
    }
}
// this is webhooks test
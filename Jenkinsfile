pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                 git branch: 'main', url: 'https://github.com/wajahat001/CI-CD.git'
                 credentialsId: 'AWS-KEY'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("my-html-site")
                }
            }
        }
        stage('Deploy to AWS') {
            steps {
                sshagent(['AWS-KEY']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@54.221.128.206 "
                    docker stop my-html-site || true &&
                    docker rm my-html-site || true &&
                    docker run -d -p 8081:8080 --name my-html-site my-html-site:latest
                    "
                    '''
                }
            }
        }
    }
}



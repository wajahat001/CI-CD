pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/wajahat001/CI-CD.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("my-html-site")
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'AWS-KEY', keyFileVariable: 'SSH_KEY')]) {
                        bat '''
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" ec2-user@54.87.224.85 << EOF
                        set -e
                        docker stop my-html-site || true
                        docker rm my-html-site || true
                        docker run -d -p 8081:8080 --name my-html-site my-html-site:latest
                        EOF
                        '''
                    }
                }
            }
        }

        stage('Clean up Old Docker Images') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'AWS-KEY', keyFileVariable: 'SSH_KEY')]) {
                        bat '''
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" ec2-user@54.87.224.85 << EOF
                        set -e
                        docker image prune -f
                        EOF
                        '''
                    }
                }
            }
        }
    }
}

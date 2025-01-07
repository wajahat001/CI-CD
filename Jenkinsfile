pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wajahat001/my-html-site:latest"
        EC2_USER = "ec2-user"
        EC2_IP = "52.91.94.32"
        REMOTE_DIR = "/var/www/portfolio"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/wajahat001/CI-CD.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("my-html-site")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.build("my-html-site").push()
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'AWS-KEY', keyFileVariable: 'SSH_KEY')]) {
                        sh """
                            echo "Running SSH Command to Deploy Docker Image"
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ec2-user@52.91.94.32 << EOF
                            docker stop my-html-site || true
                            docker rm my-html-site || true
                            docker pull wajahat001/my-html-site:latest
                            docker run -d -p 80:80 --name my-html-site wajahat001/my-html-site:latest
                            EOF
                        """
                    }
                }
            }
        }
    }
}

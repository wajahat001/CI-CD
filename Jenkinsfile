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
                    // Define the dockerImage variable here to make it accessible later
                    dockerImage = docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Authenticate to Docker Hub using Jenkins credentials
                    docker.withRegistry('https://index.docker.io/v1/', 'DOCKER-HUB') {
                        dockerImage.push()
                    }
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
                            sudo systemctl status docker || sudo service docker start
                            sudo docker stop my-html-site || true
                            sudo docker rm my-html-site || true
                            sudo docker pull my-html-site
                            sudo docker run -d -p 80:80 --name my-html-site my-html-site
                            EOF
                        """
                    }
                }
            }
        }
    }
}

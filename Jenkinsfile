pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wajahat001/my-html-site:latest"
        EC2_USER = "ec2-user"
        EC2_IP = "3.82.221.106"
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
                    dockerImage = docker.build('wajahat001/my-html-site:latest')
                }
            }
        }

        stage('Push Docker Image') {
        steps {
        script {
            // Push the pre-built Docker image to Docker Hub
            docker.withRegistry('https://index.docker.io/v1/', 'DOCKER-HUB') {
                dockerImage.push()  // Push the image with the 'latest' tag
            }
        }
    }
}


        stage('Deploy to AWS') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'AWS-KEY', keyFileVariable: 'SSH_KEY')]) {
                    bat """
                    icacls "%SSH_KEY%" /inheritance:r /grant:r "Administrators:F"
                    ssh -T -o StrictHostKeyChecking=no -i %SSH_KEY% ec2-user@3.82.221.106
                    "sudo systemctl status docker || sudo service docker start"
                    "sudo docker stop my-html-site || true"
                    "sudo docker rm my-html-site || true"
                    "sudo docker pull my-html-site"
                    "sudo docker run -d -p 80:80 --name my-html-site my-html-site"
                    """
                    }
                }
            }
        }
    }
}

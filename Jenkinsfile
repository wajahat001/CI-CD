pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wajahat001/my-html-site:latest"
        EC2_USER = "ec2-user"
        EC2_IP = "54.86.33.103"
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
                    ssh -o StrictHostKeyChecking=no -i %SSH_KEY% ec2-user@54.86.33.103 "sudo systemctl status docker || sudo service docker start"
                    ssh -o StrictHostKeyChecking=no -i %SSH_KEY% ec2-user@54.86.33.103 "sudo docker stop my-html-site || true"
                    ssh -o StrictHostKeyChecking=no -i %SSH_KEY% ec2-user@54.86.33.103 "sudo docker rm my-html-site || true"
                    ssh -o StrictHostKeyChecking=no -i %SSH_KEY% ec2-user@54.86.33.103 "sudo docker pull my-html-site"
                    ssh -o StrictHostKeyChecking=no -i %SSH_KEY% ec2-user@54.86.33.103 "sudo docker run -d -p 80:80 --name my-html-site my-html-site"
                    """
                    }
                }
            }
        }
    }
}

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
                    def dockerImage = docker.build("my-html-site")
                }
            }
        }
        stage('Deploy to AWS') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'AWS-KEY', keyFileVariable: 'SSH_KEY')]) {
                        bat '''
                        echo "Setting Permissions for SSH Key"
                        icacls "%SSH_KEY%" /inheritance:r /grant:r "Administrators:F"
                        echo "Running SSH Command to Deploy Docker Image"
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" ec2-user@3.88.51.38\
                        "docker stop my-html-site || true && docker rm my-html-site || true && docker pull wajahat001/my-html-site:latest && docker run -d -p 80:80 --name my-html-site wajahat001/my-html-site:latest"

                        '''
                    }
                }
            }
        }
    }
}

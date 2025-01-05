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
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" ec2-user@44.223.2.230 ^
                        "docker stop my-html-site || true && docker rm my-html-site || true && docker run -d -p 8081:8080 --name my-html-site my-html-site:latest"
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
                        echo "Cleaning up Docker Images"
                        ssh -o StrictHostKeyChecking=no -i "%SSH_KEY%" ec2-user@44.223.2.230 ^
                        "docker image prune -f"
                        '''
                    }
                }
            }
        }
    }
}

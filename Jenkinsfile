pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/wajahat001/CI-CD.git'
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
                sshagent(['AWS-EC2-Key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ec2-user@54.144.252.32 "docker stop my-html-site || true && docker rm my-html-site || true && docker run -d -p 80:80 --name my-html-site my-html-site"
                    '''
                }
            }
        }
    }
}

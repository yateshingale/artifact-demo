pipeline {
    agent any

    stages {
        stage('Generate Artifacts') {
            steps {
                sh './generate.sh'
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'output/*', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}


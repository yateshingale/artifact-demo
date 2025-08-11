pipeline {
    agent any

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to build')
        choice(name: 'ENV', choices: ['dev', 'qa', 'prod'], description: 'Deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run test cases?')
        password(name: 'DEPLOY_KEY', defaultValue: '', description: 'Deployment password')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out branch: ${BRANCH}"
                git branch: "${BRANCH}", url: 'https://github.com/yateshingale/artifact-demo'
            }
        }

        stage('Info') {
            steps {
                script {
                    echo "Deploying to: ${ENV}"
                    echo "Run Tests: ${RUN_TESTS}"
                    // Don't echo password (security best practice)
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying application to ${ENV} environment..."
                // Example: using the password in a command securely
                sh 'echo "Using deployment key securely" > /dev/null'
            }
        }

        stage('Test') {
            when {
                expression { return RUN_TESTS }
            }
            steps {
                echo "Running tests..."
                sh 'echo "Test execution complete."'
            }
        }

        stage('Archive Logs') {
            steps {
                script {
                    def buildTime = new Date().format("yyyy-MM-dd HH:mm:ss", TimeZone.getTimeZone('UTC'))
                    writeFile file: 'build_log.txt', text: """
                    Build Parameters:
                    BRANCH: ${BRANCH}
                    ENV: ${ENV}
                    RUN_TESTS: ${RUN_TESTS}
                    Build Time (UTC): ${buildTime}
                    """
                    archiveArtifacts artifacts: 'build_log.txt', fingerprint: true
                }
            }
        }
    }
}

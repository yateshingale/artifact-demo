mkdir -p output
echo "Hello, Jenkins!" > output/hello.txt
zip -r output/archive.zip output/hello.txt

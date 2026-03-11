echo "startar containern på port 3000"
podman run --rm -it -p 3000:3000 \
    -v "/home/andre/projects/gw/REPOSITORY:/app/REPOSITORY:Z" \
    -e REPOSITORY_PATH=/app/REPOSITORY \
    -e REPO_ROOT=BOOKS \
    -e REPO_ROOT_PATH=/app/REPOSITORY/BOOKS \
    grand-writer:latest


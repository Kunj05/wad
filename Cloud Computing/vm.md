from vm1 to vm2

vm1
sudo apt-get update
sudo apt install net-tools
sudo apt install openssh-server     # Corrected typo: "intall" → "install", "serve" → "server"
ifconfig                            # To check IP address
touch file1.txt                     # Create a test file
echo "This is a test file." > file1.txt
cat file1.txt                       # Display contents

# Replace vm2_ip with the actual IP of vm2
scp file1.txt ubuntu-2@<vm2_ip>:/home/ubuntu-2

vm2
sudo apt-get update
sudo apt install net-tools
sudo apt install openssh-server     # Corrected typos

ifconfig                            # To confirm IP address
ssh ubuntu-2@<vm2_ip>               # Try SSH into this machine from another (optional test)

commands
su - ubuntu                         # Switch to user 'ubuntu'
sudo passwd ubuntu                  # Change 'ubuntu' user password
sudo systemctl status ssh
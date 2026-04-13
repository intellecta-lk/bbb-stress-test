#!/bin/bash

# =================================================================
# BIGBLUEBUTTON STRESS TEST AUTOMATION
# =================================================================

# Exit immediately if a command exits with a non-zero status
set -e

echo "--- Starting BBB Stress Test Setup ---"

# 1. Ensure dependencies are present
sudo apt-get update && sudo apt-get install -y  make 

# # 2. Clone the repository
# # Replacing with the standard BBB-stress-test repo URL
# if [ ! -d "bbb-stress-test" ]; then
#     git clone https://github.com/bigbluebutton/bbb-stress-test.git
# fi
# cd bbb-stress-test

# 3. Bootstrap the project
echo "--- Running Bootstrap ---"
make bootstrap
make install

# 4. Inject Environment Variables into .env
# We use the variables provided by your Cloud-init script
echo "--- Configuring .env file ---"
cat <<EOF > .env
BBB_URL=$BBB_URL
BBB_SECRET=$BBB_SECRET
BBB_MEETING_ID=$BBB_MEETING_ID
BBB_CLIENTS_LISTEN_ONLY=${BBB_CLIENTS_LISTEN_ONLY:-5}
BBB_CLIENTS_MIC=${BBB_CLIENTS_MIC:-3}
BBB_CLIENTS_WEBCAM=${BBB_CLIENTS_WEBCAM:-2}
BBB_TEST_DURATION=${BBB_TEST_DURATION:-60}
EOF

# 5. Verification (Optional but recommended)
echo "Checking configuration for Meeting ID: $BBB_MEETING_ID"

# 6. Launch the Stress Test
echo "--- Launching Stress Test ---"
make stress
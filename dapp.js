<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Token Interaction</title>
    <!-- Include Web3.js with cache busting -->
    <script src="https://cdn.jsdelivr.net/npm/web3@1.5.3/dist/web3.min.js?_cacheBuster_=timestamp"></script>
    <!-- Include your JavaScript file with cache busting -->
    <script src="dapp.js?_cacheBuster_=timestamp"></script>
    <!-- Include Google Fonts stylesheet with cache busting -->
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap&_cacheBuster_=timestamp" rel="stylesheet">
    <!-- Include your CSS file with cache busting -->
    <link rel="stylesheet" href="css/styles.css?_cacheBuster_=timestamp">
</head>
<body>
    <!-- Your existing HTML structure -->
    <button id="connectWalletBtn">Connect Wallet</button>
    <div id="walletAddress"></div>

    <header>
        <h1>The Bean Tin</h1>
        <div>
            <!-- Button to claim rewards -->
            <button class="btn btn-image" id="claimRewardsBtn">
                <span class="btn-text">Claim Rewards</span>
            </button>
            <!-- Button to mine -->
            <button class="btn btn-image" id="cookBtn">
                <span class="btn-text">Cook</span>
            </button>
        </div>
    </header>

    <div class="container">
        <!-- Input fields and buttons as per your structure -->
    </div>

    <!-- Orange rain effect container -->
    <div id="rainEffectContainer"></div>

    <!-- Twitter logo with link -->
    <a href="https://x.com/TheBeanTin" target="_blank" rel="noopener noreferrer">
        <img src="twitter-x-logo-png-9.png" alt="Twitter" class="twitter-logo">
    </a>

    <!-- JavaScript to replace 'timestamp' with current time -->
    <script>
        document.addEventListener('DOMContentLoaded', async function () {
            // Replace 'timestamp' with the current time
            const timestamp = new Date().getTime();

            // Update all script tags with timestamp in the query string
            document.querySelectorAll('script[src*="timestamp"]').forEach((script) => {
                script.src = script.src.replace('timestamp', timestamp);
            });

            // Update all link tags with timestamp in the query string
            document.querySelectorAll('link[href*="timestamp"]').forEach((link) => {
                link.href = link.href.replace('timestamp', timestamp);
            });

            // Your existing JavaScript code here
            try {
                // Define the contract address
                const contractAddress = '0x9beaa09183e371e1c3a9773eb62f5376d2cf25b5'; // Replace with your contract address

                // Load contract ABI asynchronously
                const response = await fetch('./GameToken.json');
                const contractABI = await response.json();

                // Initialize web3 provider from MetaMask
                const web3 = new Web3(window.ethereum);

                // Initialize contract instance
                const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

                // Function to trigger orange rain effect
                function triggerOrangeRain() {
                    const container = document.getElementById('rainEffectContainer');

                    // Create multiple orange drop elements and append them to the container
                    for (let i = 0; i < 50; i++) {
                        const orangeDrop = document.createElement('div');
                        orangeDrop.classList.add('orange-drop');

                        // Randomize position and animation delay for each drop
                        const randomX = Math.random() * window.innerWidth;
                        const randomDelay = Math.random() * 2; // Delay between 0 and 2 seconds
                        const randomDuration = Math.random() * 2 + 1.5; // Duration between 1.5 and 3.5 seconds

                        orangeDrop.style.left = `${randomX}px`;
                        orangeDrop.style.animationDelay = `${randomDelay}s`;
                        orangeDrop.style.animationDuration = `${randomDuration}s`;

                        container.appendChild(orangeDrop);
                    }
                }

                // Your existing event listeners and logic below...

                // Connect wallet button click event
                document.getElementById('connectWalletBtn').addEventListener('click', async () => {
                    try {
                        // Request access to MetaMask accounts
                        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        // Display connected wallet address
                        document.getElementById('walletAddress').innerText = accounts[0];
                        // Hide the connect wallet button
                        document.getElementById('connectWalletBtn').style.display = 'none';
                    } catch (error) {
                        console.error('Error connecting wallet:', error);
                        alert('Error connecting wallet. Please try again later.');
                    }
                });

                // Other existing functions and event listeners...

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    </script>
</body>
</html>

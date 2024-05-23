// Define the contract address
const contractAddress = '0x5f527a035ea2f690963591552877d5160974e24a'; // Replace with your contract address

// Load contract ABI asynchronously
fetch('./GameToken.json')
    .then(response => response.json())
    .then(contractABI => {
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

        // Connect wallet button click event (for MetaMask)
        document.getElementById('connectWalletBtn').addEventListener('click', async () => {
            try {
                // Request access to MetaMask accounts
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Display connected wallet address
                document.getElementById('walletAddress').innerText = accounts[0];
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        });

        // Other button click events...
        // Handle join game, claim rewards, accept invite, invite, and mine button click events
        // ...

        // Handle join game button click event
        document.getElementById('joinGameBtn').addEventListener('click', async () => {
            const referral = document.getElementById('referralAddress').value; // Get referral address from input field
            // Call joinGame function
            await contractInstance.methods.joinGame(referral).send({ from: window.ethereum.selectedAddress });

            // Trigger orange rain effect
            triggerOrangeRain();
        });

        // Handle claim rewards button click event
        document.getElementById('claimRewardsBtn').addEventListener('click', async () => {
            // Call claimRewards function
            await contractInstance.methods.claimRewards().send({ from: window.ethereum.selectedAddress });

            // Trigger orange rain effect
            triggerOrangeRain();
        });

        // Handle accept invite button click event
        document.getElementById('acceptInviteBtn').addEventListener('click', async () => {
            const inviteId = document.getElementById('inviteId').value; // Get invite ID from input field
            // Call acceptInvite function
            await contractInstance.methods.acceptInvite(inviteId).send({ from: window.ethereum.selectedAddress });

            // Trigger orange rain effect
            triggerOrangeRain();
        });

        // Handle create team button click event
        document.getElementById('createTeamBtn').addEventListener('click', async () => {
            const teamName = document.getElementById('teamName').value; // Get team name from input field
            // Call createTeam function with an empty array as team members
            await contractInstance.methods.createTeam(teamName, []).send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('0.01', 'ether') });

            // Trigger orange rain effect
            triggerOrangeRain();
        });

        // Handle invite button click event
        document.getElementById('inviteBtn').addEventListener('click', async () => {
            const playerToInvite = document.getElementById('playerToInvite').value; // Get player to invite address from input field
            // Call invite function
            await contractInstance.methods.invite(playerToInvite).send({ from: window.ethereum.selectedAddress });

            // Trigger orange rain effect
            triggerOrangeRain();
        });

        // Handle mine button click event
        document.getElementById('mineBtn').addEventListener('click', async () => {
            // Call mine function
            // This function doesn't require any additional input
            await contractInstance.methods.mine().send({ from: window.ethereum.selectedAddress });

            // Trigger orange rain effect
            triggerOrangeRain();
        });
    })
    .catch(error => {
        console.error('Error loading contract ABI:', error);
    });


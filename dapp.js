// Define the contract address
const contractAddress = '0xd81a2fee7ebfbd82771e5c2f1d897e1847beb0cf'; // Replace with your contract address

// Load contract ABI asynchronously
fetch('./GameToken.json')
    .then(response => response.json())
    .then(contractABI => {
        // Initialize web3 provider from MetaMask
        const web3 = new Web3(window.ethereum);

        // Initialize contract instance
        const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

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
        // Handle join game, claim rewards, accept invite, create team, invite, and mine button click events
        // ...

        // Handle join game button click event
        document.getElementById('joinGameBtn').addEventListener('click', async () => {
            const referral = document.getElementById('referralAddress').value; // Get referral address from input field
            // Call joinGame function
            await contractInstance.methods.joinGame(referral).send({ from: window.ethereum.selectedAddress });
        });

        // Handle claim rewards button click event
        document.getElementById('claimRewardsBtn').addEventListener('click', async () => {
            // Call claimRewards function
            await contractInstance.methods.claimRewards().send({ from: window.ethereum.selectedAddress });
        });

        // Handle accept invite button click event
        document.getElementById('acceptInviteBtn').addEventListener('click', async () => {
            const inviteId = document.getElementById('inviteId').value; // Get invite ID from input field
            // Call acceptInvite function
            await contractInstance.methods.acceptInvite(inviteId).send({ from: window.ethereum.selectedAddress });
        });

        // Handle create team button click event
        document.getElementById('createTeamBtn').addEventListener('click', async () => {
            const teamMembersInput = document.getElementById('teamMembers').value; // Get team member addresses from input field
            const teamMembers = teamMembersInput.split(',').map(address => address.trim()); // Convert input string to array of addresses
            // Call createTeam function
            await contractInstance.methods.createTeam(teamMembers).send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('0.01', 'ether') });
        });

        // Handle invite button click event
        document.getElementById('inviteBtn').addEventListener('click', async () => {
            const playerToInvite = document.getElementById('playerToInvite').value; // Get player to invite address from input field
            // Call invite function
            await contractInstance.methods.invite(playerToInvite).send({ from: window.ethereum.selectedAddress });
        });

        // Handle mine button click event
        document.getElementById('mineBtn').addEventListener('click', async () => {
            // Call mine function
            // This function doesn't require any additional input
            await contractInstance.methods.mine().send({ from: window.ethereum.selectedAddress });
        });
    })
    .catch(error => {
        console.error('Error loading contract ABI:', error);
    });

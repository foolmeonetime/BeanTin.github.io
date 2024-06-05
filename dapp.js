document.addEventListener('DOMContentLoaded', async function() {
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

        // Connect wallet button click event (for MetaMask)
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

        // Function to check if enough time has passed since the last cook
        function canCook() {
            const lastCookedTimestamp = localStorage.getItem('lastCookedTimestamp');
            if (!lastCookedTimestamp) {
                return true; // Allow cooking if no timestamp is stored
            }

            const now = new Date().getTime();
            const lastCookedTime = parseInt(lastCookedTimestamp, 10);
            const elapsedTimeSinceLastCook = now - lastCookedTime;
            const hoursSinceLastCook = elapsedTimeSinceLastCook / (1000 * 60 * 60); // Convert milliseconds to hours

            return hoursSinceLastCook >= 24;
        }

        async function displayTeamInvitations() {
            try {
                // Call invitationList function to retrieve team invitations
                const teamsWithInvites = await contractInstance.methods.invitationList().call({ from: window.ethereum.selectedAddress });
        
                // Clear existing list items
                const teamInvitationsList = document.getElementById('teamInvitationsList');
                teamInvitationsList.innerHTML = '';
        
                // Loop through each invitation and create list items
                teamsWithInvites.forEach((team) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>Team Name:</strong> ${team.teamName}, <strong>Invite Code:</strong> ${team.inviteCode}`;
                    teamInvitationsList.appendChild(listItem);
                });
            } catch (error) {
                console.error('Error retrieving team invitations:', error);
                // Display error message in the UI
                alert('Error retrieving team invitations. Please try again later.');
            }
        }
        
        // Event listener for displayInvitationsBtn button click event
        document.getElementById('displayInvitationsBtn').addEventListener('click', async () => {
            await displayTeamInvitations();
        });

        // Handle join game button click event
        document.getElementById('joinGameBtn').addEventListener('click', async () => {
            const referral = document.getElementById('referralAddress').value; // Get referral address from input field
            try {
                // Call joinGame function
                await contractInstance.methods.joinGame(referral).send({ from: window.ethereum.selectedAddress });

                // Trigger orange rain effect
                triggerOrangeRain();
            } catch (error) {
                console.error('Error joining the game:', error);
                // Display error message in the UI
                alert('Error joining the game. Please try again later.');
            }
        });

        // Handle claim rewards button click event
        document.getElementById('claimRewardsBtn').addEventListener('click', async () => {
            try {
                // Call claimRewards function
                await contractInstance.methods.claimRewards().send({ from: window.ethereum.selectedAddress });

                // Trigger orange rain effect
                triggerOrangeRain();
            } catch (error) {
                console.error('Error claiming rewards:', error);
                // Display error message in the UI
                alert('Error claiming rewards. Please try again later.');
            }
        });

        // Handle accept invite button click event
        document.getElementById('acceptInviteBtn').addEventListener('click', async () => {
            const inviteId = document.getElementById('inviteId').value; // Get invite ID from input field
            try {
                // Call acceptInvite function
                await contractInstance.methods.acceptInvite(inviteId).send({ from: window.ethereum.selectedAddress });

                // Trigger orange rain effect
                triggerOrangeRain();
            } catch (error) {
                console.error('Error accepting invite:', error);
                // Display error message in the UI
                alert('Error accepting invite. Please try again later.');
            }
        });

        // Handle create team button click event
        document.getElementById('createTeamBtn').addEventListener('click', async () => {
            const teamName = document.getElementById('teamName').value; // Get team name from input field
            try {
                // Call createTeam function with the team name only
                await contractInstance.methods.createTeam(teamName).send({ from: window.ethereum.selectedAddress });

                // Trigger orange rain effect
                triggerOrangeRain();
            } catch (error) {
                console.error('Error creating team:', error);
                // Display error message in the UI
                alert('Error creating team. Please try again later.');
            }
        });

        // Handle invite button click event
        document.getElementById('inviteBtn').addEventListener('click', async () => {
            const playerToInvite = document.getElementById('playerToInvite').value.trim(); // Get player to invite address from input field
            try {
                // Check if the input field is not empty
                if(playerToInvite === '') {
                    alert('Please enter the Ethereum address of the player you want to invite.');
                    return;
                }

                // Call invite function
                await contractInstance.methods.invite(playerToInvite).send({ from: window.ethereum.selectedAddress });

                // Display success message
                alert('Invitation sent successfully.');

                // Trigger orange rain effect
                triggerOrangeRain();
            } catch (error) {
                console.error('Error inviting player:', error);
                // Display error message in the UI
                alert('Error inviting player. Please try again later.');
            }
        });

        // Handle display stats button click event
        document.getElementById('displayStatsBtn').addEventListener('click', async () => {
            try {
                // Call stats function to retrieve player stats
                const stats = await contractInstance.methods.stats().call({ from: window.ethereum.selectedAddress });

                // Convert beans accumulated to a whole number
                const beansAccumulated = Number(stats[0]) / (10 ** 18); // Assuming 18 decimals for BEAN token

                // Display player stats in the UI
                document.getElementById('playerStats').innerHTML = `
                    <p>Beans Accumulated: ${beansAccumulated}</p>
                    <p>Player Level: ${stats[1]}</p>
                    <p>Referrals Count: ${stats[2]}</p>
                `;
            } catch (error) {
                console.error('Error retrieving player stats:', error);
                // Display error message in the UI
                alert('Error retrieving player stats. Please try again later.');
            }
        });

        // Handle cook button click event
        document.getElementById('cookBtn').addEventListener('click', async () => {
            if (!canCook()) {
                alert('You can only cook once every 24 hours.');
                return;
            }

            try {
                // Call mine function
                await contractInstance.methods.mine().send({ from: window.ethereum.selectedAddress });

                // Update last cooked timestamp
                localStorage.setItem('lastCookedTimestamp', new Date().getTime().toString());

                // Disable cook button for 24 hours
                document.getElementById('cookBtn').disabled = true;
                setTimeout(() => {
                    document.getElementById('cookBtn').disabled = false;
                }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

                // Trigger orange rain effect
                triggerOrangeRain();
            } catch (error) {
                console.error('Error cooking:', error);
                // Display error message in the UI
                alert('Error cooking. Please try again later.');
            }
        });

    } catch (error) {
        console.error('Error:', error);
        // Handle errors here
        alert('An error occurred. Please try again later.');
    }
});

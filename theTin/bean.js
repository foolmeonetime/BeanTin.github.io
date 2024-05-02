// Initialize the BeanGame contract instance
const contractAddress = "0x5487a0c0c32e4d0140f7d824e7499e8c3275c1ff"; // Replace with the deployed contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_teamOwner",
				"type": "address"
			}
		],
		"name": "acceptTeamInvite",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "halveMiningReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "inviteToTeam",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_referrer",
				"type": "address"
			}
		],
		"name": "joinGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "mineTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pauseWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resumeWithdrawal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_miningAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newReward",
				"type": "uint256"
			}
		],
		"name": "MiningRewardHalved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "mintAndSendToMiningAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "TokensMintedAndSent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawBeans",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "beansBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "beansMinted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "checkReferralCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastMiningTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "level",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxTeamSize",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "miningAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "miningCooldown",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "miningReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "playerTeam",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "points",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "referralCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "referralReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "referrer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "teamInvitations",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "teamMembers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawPaused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with the ABI of the deployed contract
const beanGameInstance = new web3.eth.Contract(contractABI, contractAddress);

// Function to handle joining game
const handleJoinGame = async (playerAddress) => {
    try {
        await beanGameInstance.methods.joinGame(playerAddress).send({ from: playerAddress });
        console.log('Joined the game successfully!');
    } catch (error) {
        console.error('Error joining the game:', error);
    }
};

// Function to handle inviting to team
const handleInviteToTeam = async (playerAddress) => {
    try {
        await beanGameInstance.methods.inviteToTeam(playerAddress).send({ from: playerAddress });
        console.log('Invited to team successfully!');
    } catch (error) {
        console.error('Error inviting to team:', error);
    }
};

// Function to handle withdrawing tokens
const handleWithdrawTokens = async (amount, playerAddress) => {
    try {
        await beanGameInstance.methods.withdrawBeans(amount).send({ from: playerAddress });
        console.log('Tokens withdrawn successfully!');
    } catch (error) {
        console.error('Error withdrawing tokens:', error);
    }
};

// Function to handle mining tokens
const handleMineTokens = async (playerAddress) => {
    try {
        await beanGameInstance.methods.mineTokens().send({ from: playerAddress });
        console.log('Tokens mined successfully!');
    } catch (error) {
        console.error('Error mining tokens:', error);
    }
};

// Function to handle fetching team invitations
const fetchTeamInvitations = async (playerAddress) => {
    try {
        const invitations = await beanGameInstance.methods.getTeamInvitations(playerAddress).call();
        return invitations;
    } catch (error) {
        console.error('Error fetching team invitations:', error);
        return [];
    }
};

// Function to handle accepting a team invitation
const handleAcceptTeamInvite = async (teamOwner, playerAddress) => {
    try {
        await beanGameInstance.methods.acceptTeamInvite(teamOwner).send({ from: playerAddress });
        console.log('Team invitation accepted successfully!');
    } catch (error) {
        console.error('Error accepting team invitation:', error);
    }
};

const DAppFunctionality = ({ playerAddress }) => {
    const [teamInvitations, setTeamInvitations] = useState([]);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [playerToInvite, setPlayerToInvite] = useState('');
    const [referrerAddress, setReferrerAddress] = useState('');

    useEffect(() => {
        const fetchInvitations = async () => {
            const invitations = await fetchTeamInvitations(playerAddress);
            setTeamInvitations(invitations);
        };
        fetchInvitations();
    }, []);

    const handleAcceptInvite = async (teamOwner) => {
        await handleAcceptTeamInvite(teamOwner, playerAddress);
        // After accepting the invite, refresh the list of invitations
        const updatedInvitations = await fetchTeamInvitations(playerAddress);
        setTeamInvitations(updatedInvitations);
    };

    const handleWithdraw = async () => {
        const amount = parseInt(withdrawAmount);
        if (isNaN(amount) || amount <= 0) {
            console.error('Please enter a valid amount.');
            return;
        }
        await handleWithdrawTokens(amount, playerAddress);
        setWithdrawAmount(''); // Clear input after withdrawal
    };

    return (
        <div>
            <div>
                <input type="text" placeholder="Enter referrer address" value={referrerAddress} onChange={(e) => setReferrerAddress(e.target.value)} />
                <button onClick={() => handleJoinGame(referrerAddress)}>Join Game</button>
            </div>
            <div>
                <input type="text" placeholder="Enter player address to invite" value={playerToInvite} onChange={(e) => setPlayerToInvite(e.target.value)} />
                <button onClick={() => handleInviteToTeam(playerToInvite)}>Invite to Team</button>
            </div>
            <div>
                <input type="number" placeholder="Enter amount to withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
                <button onClick={handleWithdraw}>Withdraw Tokens</button>
            </div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Team Invitations
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {teamInvitations.map((teamOwner) => (
                        <li key={teamOwner}>
                            <button className="dropdown-item" onClick={() => handleAcceptInvite(teamOwner)}>Accept Invitation from {teamOwner}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

ReactDOM.render(<DAppFunctionality playerAddress="PLAYER_ADDRESS" />, document.getElementById('app'));

// Function to connect MetaMask
const connectMetaMask = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        // MetaMask is installed
        try {
            // Request access to the user's MetaMask accounts
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask!');
        } catch (error) {
            console.error(error);
        }
    } else {
        // MetaMask is not installed
        console.log('MetaMask is not installed.');
    }
};

document.getElementById('connectButton').addEventListener('click', connectMetaMask);

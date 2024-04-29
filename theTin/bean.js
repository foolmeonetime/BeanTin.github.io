import React, { useState, useEffect } from 'react';
import web3 from './getWeb3';
import contractArtifact from './contracts/BeanGame.json'; // Replace with your contract artifact

const contractAddress = 'CONTRACT_ADDRESS'; // Replace with your contract address

const contract = require('truffle-contract');
const beanGameContract = contract(contractArtifact);
beanGameContract.setProvider(web3.currentProvider);

const beanGameInstance = beanGameContract.at(contractAddress);

const DAppFunctionality = ({ playerAddress }) => {
  const [referrer, setReferrer] = useState('');
  const [joinStatus, setJoinStatus] = useState('');
  const [playerAddressInput, setPlayerAddressInput] = useState('');
  const [inviteStatus, setInviteStatus] = useState('');
  const [mineStatus, setMineStatus] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawStatus, setWithdrawStatus] = useState('');
  const [points, setPoints] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [invitationsReceived, setInvitationsReceived] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the points and checkReferralCount functions of the smart contract
        const playerPoints = await beanGameInstance.points(playerAddress);
        const playerReferralCount = await beanGameInstance.checkReferralCount(playerAddress);
        setPoints(playerPoints.toNumber());
        setReferralCount(playerReferralCount.toNumber());

        // Call the checkTeamInvitations function of the smart contract
        const invitations = await beanGameInstance.checkTeamInvitations();
        setInvitationsReceived(invitations);
      } catch (error) {
        console.error('Error fetching points, referral count, and invitations:', error);
      }
    };

    fetchData();
  }, [playerAddress]);

  const handleJoinGame = async () => {
    try {
      // Call the joinGame function of the smart contract
      await beanGameInstance.joinGame(referrer);
      setJoinStatus('Joined successfully!');
    } catch (error) {
      console.error('Error joining game:', error);
      setJoinStatus('Error joining game');
    }
  };

  const handleInviteToTeam = async () => {
    try {
      // Call the inviteToTeam function of the smart contract
      await beanGameInstance.inviteToTeam(playerAddressInput);
      setInviteStatus('Invitation sent successfully!');
    } catch (error) {
      console.error('Error inviting to team:', error);
      setInviteStatus('Error sending invitation');
    }
  };

  const handleAcceptTeamInvite = async (teamOwner) => {
    try {
      // Call the acceptTeamInvite function of the smart contract
      await beanGameInstance.acceptTeamInvite(teamOwner);
      setInvitationsReceived(invitationsReceived.filter(invitation => invitation !== teamOwner));
    } catch (error) {
      console.error('Error accepting team invitation:', error);
    }
  };

  const handleMineTokens = async () => {
    try {
      // Call the mineTokens function of the smart contract
      await beanGameInstance.mineTokens();
      setMineStatus('Tokens mined successfully!');
    } catch (error) {
      console.error('Error mining tokens:', error);
      setMineStatus('Error mining tokens');
    }
  };

  const handleWithdrawTokens = async () => {
    try {
      // Call the withdrawBeans function of the smart contract with the specified amount
      await beanGameInstance.withdrawBeans(withdrawAmount);
      setWithdrawStatus('Tokens withdrawn successfully!');
    } catch (error) {
      console.error('Error withdrawing tokens:', error);
      setWithdrawStatus('Error withdrawing tokens');
    }
  };

  return (
    <div>
      {/* Join Game */}
      <div>
        <input type="text" placeholder="Referrer address" value={referrer} onChange={(e) => setReferrer(e.target.value)} />
        <button onClick={handleJoinGame}>Join Game</button>
        <p>{joinStatus}</p>
      </div>

      {/* Invite to Team */}
      <div>
        <input type="text" placeholder="Player address" value={playerAddressInput} onChange={(e) => setPlayerAddressInput(e.target.value)} />
        <button onClick={handleInviteToTeam}>Invite to Team</button>
        <p>{inviteStatus}</p>
      </div>

      {/* Accept Team Invitations */}
      <div>
        <p>Pending Team Invitations:</p>
        {invitationsReceived.map(invitation => (
          <div key={invitation}>
            <p>{invitation}</p>
            <button onClick={() => handleAcceptTeamInvite(invitation)}>Accept Invitation</button>
          </div>
        ))}
      </div>

      {/* Mine Tokens */}
      <div>
        <button onClick={handleMineTokens}>Mine Tokens</button>
        <p>{mineStatus}</p>
      </div>

      {/* Withdraw Tokens */}
      <div>
        <input type="number" placeholder="Amount to withdraw" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
        <button onClick={handleWithdrawTokens}>Withdraw Tokens</button>
        <p>{withdrawStatus}</p>
      </div>

      {/* Check Points and Referrals */}
      <div>
        <p>Points: {points}</p>
        <p>Referral Count: {referralCount}</p>
      </div>
    </div>
  );
};

export { beanGameInstance, DAppFunctionality };

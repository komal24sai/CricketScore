let team1 = { score: 0, wickets: 0, balls: 0, timeline: [] };
let team2 = { score: 0, wickets: 0, balls: 0, timeline: [] };
let isTeam1Batting = true;
let matchStarted = false;
let matchEnded = false;

function updateUI() {
  document.getElementById('team1Score').textContent = team1.score;
  document.getElementById('team1Wickets').textContent = team1.wickets;
  document.getElementById('team1Overs').textContent = (team1.balls / 6).toFixed(1);
  document.getElementById('team1Timeline').textContent = team1.timeline.join(' ');

  document.getElementById('team2Score').textContent = team2.score;
  document.getElementById('team2Wickets').textContent = team2.wickets;
  document.getElementById('team2Overs').textContent = (team2.balls / 6).toFixed(1);
  document.getElementById('team2Timeline').textContent = team2.timeline.join(' ');
}

function startMatch() {
  if (matchEnded) return;
  matchStarted = true;
  document.getElementById('result').textContent = "";
}

function restartMatch() {
  team1 = { score: 0, wickets: 0, balls: 0, timeline: [] };
  team2 = { score: 0, wickets: 0, balls: 0, timeline: [] };
  isTeam1Batting = true;
  matchStarted = false;
  matchEnded = false;
  updateUI();
  document.getElementById('result').textContent = "";
}

function addRun(runs) {
  if (!matchStarted || matchEnded) return;

  const team = isTeam1Batting ? team1 : team2;
  team.score += runs;
  team.balls++;
  team.timeline.push(runs === 0 ? '⛔' : runs + '️⃣');

  checkOver(team);
  checkWin();
  updateUI();
}

function addWicket() {
  if (!matchStarted || matchEnded) return;

  const team = isTeam1Batting ? team1 : team2;
  team.wickets++;
  team.balls++;
  team.timeline.push('🟥');

  checkOver(team);
  checkWin();
  updateUI();
}

function checkOver(team) {
  if (team.balls >= 12 || team.wickets >= 10) {
    if (isTeam1Batting) {
      isTeam1Batting = false;
    } else {
      endMatch();
    }
  }
}

function checkWin() {
  if (!isTeam1Batting && team2.score > team1.score) {
    endMatch("Team 2 wins!");
  } else if (!isTeam1Batting && team2.balls >= 12) {
    const result = team1.score > team2.score ? "Team 1 wins!" : team1.score === team2.score ? "Match Draw!" : "Team 2 wins!";
    endMatch(result);
  }
}

function endMatch(message = "") {
  matchEnded = true;
  if (message) {
    document.getElementById('result').textContent = message;
  }
}

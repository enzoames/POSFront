import React from 'react';
import moment from 'moment';

export function hasValue(data) {
  return (data !== undefined) && (data !== null) && (data !== "") && (data !== '') && (data.length !== 0);
}

export const credentialOptions = [ 
  {label:'Athlete', value:'A', name:'credential'}, 
  {label:'Team Captain', value:'T', name:'credential'},
  {label:'League Organizer', value:'L', name:'credential'}
];


// obj = [ {key: value, key: value, key: value}, {key: value, key: value, key: value} ]
// == vs ===
// == for same value, '1' == 1 true
// === for same value and type
export function checkExistance(obj, key, value){
  let result = false;
  obj.map( (item) => { if (item[key] == value) result = true });
  return result;
}


export function isBeforeDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}


export function isInclusivelyAfterDay(a, b) {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !isBeforeDay(a, b);
}


export function leagueSelectOptions(leagueOwner){
  const options = []
  leagueOwner.map( (league) => options.push( {label: league.league_instance.name, value: league.league_instance.id, name: "myLeague"} ) );
  return options;
}


export function teamSelectOptions(teamOwner){
  const options = []
  teamOwner.map( (team) => options.push( {label: team.team_instance.name, value: team.team_instance.id, name: "myTeam"} ) );
  return options;
}


export const weekdayOptions = [
  { label: 'Mon', value: 0 },
  { label: 'Tue', value: 1 },
  { label: 'Wed', value: 2 },
  { label: 'Thu', value: 3 },
  { label: 'Fri', value: 4 },
  { label: 'Sat', value: 5 },
  { label: 'Sun', value: 6 },
];


export const footballOptions = [
  { label: 'Center-Back', value: 1 },
  { label: 'Sweeper', value: 2 },
  { label: 'Defense', value: 3 },
  { label: 'Right Full-Back', value: 4 },
  { label: 'Left Full-Back', value: 5 },
  { label: 'Centre Mid', value: 6 },
  { label: 'Defensive Mid', value: 7 },
  { label: 'Attacking Mid', value: 8 },
  { label: 'Midfield', value: 9 },
  { label: 'Right Mid', value: 10 },
  { label: 'Left Mid', value: 11 },
  { label: 'Right Wing', value: 12 },
  { label: 'Left Wing', value: 13 },
  { label: 'Centre Forward', value: 14 },
  { label: 'Forward', value: 15 },
  { label: 'Goalkeeper', value: 16 },
  { label: 'Striker', value: 17 },
  { label: 'False 9', value: 18 },
  { label: 'Anywhere', value: 19 },
]


export const gameTypeOptions = [
  { label: 'Regular Season', value: 'regular season' },
  { label: 'Playoff Match', value: 'playoff match'},
  { label: 'Friendly', value: 'friendly'},
];

export function constructInvitations(league_invites=[], team_invites=[]){
  let recent = [];
  let earlier = [];
  league_invites.map( (invitation) => invitation.is_active ? recent.push({invitation: invitation, type: 'L'}) : earlier.push({invitation: invitation, type: 'L'}) );
  team_invites.map( (invitation) => invitation.is_active ? recent.push({invitation: invitation, type: 'T'}) : earlier.push({invitation: invitation, type: 'T'}) );
  
  recent.sort( (invitation) => { return new Date(invitation.invitation.updated_at) } );
  earlier.sort( (invitation) => { return new Date(invitation.invitation.updated_at) } );
  return {recent: recent, earlier: earlier };
}


export function constructStatsResult(homeTeamStats,awayTeamStats,values){
  Object.keys(values).map((key)=>{
    const keyArraySplit = key.split('-');
    let playerStat = {
      "userInstance":'',
      "goals":'',
      "attended":false,
      "username":""
    };
    let userInstanceAlreadyReplaced = false;
    //for Home team atheletes
    if(keyArraySplit[0] ==="home"){// keyArraySplit[0] === "away"
      playerStat["userInstance"] = keyArraySplit[2]; 
      playerStat["username"] = keyArraySplit[3];
      let instance = getInstance(homeTeamStats.TeamAthletes,keyArraySplit[3]);
      if(keyArraySplit[1] === "goal"){
        playerStat["goals"] = values[key]; //getplayerGoals
       }
     else if(keyArraySplit[1] === "attend"){
       if(instance){
        let oldInstance = instance;
        instance["attended"] = values[key];
        homeTeamStats.TeamAthletes[homeTeamStats.TeamAthletes.indexOf(oldInstance)] = instance;
        userInstanceAlreadyReplaced = true;  
       }
      }
      keyArraySplit[0] ==="home" && !userInstanceAlreadyReplaced ? homeTeamStats.TeamAthletes.push(playerStat) : null;//awayTeamStats.TeamAthletes.push(playerStat) ;
     }
     //for Away athletes 
     if(keyArraySplit[0] ==="away"){// keyArraySplit[0] === "away"
      playerStat["userInstance"] = keyArraySplit[2]; 
      playerStat["username"] = keyArraySplit[3];
      let instance = getInstance(awayTeamStats.TeamAthletes,keyArraySplit[3]);
      if(keyArraySplit[1] === "goal"){
        playerStat["goals"] = values[key]; //getplayerGoals
       }
     else if(keyArraySplit[1] === "attend"){
       if(instance){
        let oldInstance = instance;
        instance["attended"] = values[key];
        awayTeamStats.TeamAthletes[awayTeamStats.TeamAthletes.indexOf(oldInstance)] = instance;
        userInstanceAlreadyReplaced = true;  
       }
      }
      keyArraySplit[0] ==="away" && !userInstanceAlreadyReplaced ? awayTeamStats.TeamAthletes.push(playerStat) : null;//awayTeamStats.TeamAthletes.push(playerStat) ;
     }

 })
 return Object.assign({},{"homeTeam":homeTeamStats},{"awayTeam":awayTeamStats});

}

function getInstance(Arr, username){
  let bool = null;
  Arr.map( (player) => {
    if(player.username === username){
      bool = player;
    }
  });
  
  return bool;
}






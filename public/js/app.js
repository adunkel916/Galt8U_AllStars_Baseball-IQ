// ============ DATA ============
const ALL_POS = ["P","C","1B","2B","SS","3B","LF","CF","RF","SF"];

const POS = {
  HOME:{x:200,y:330}, "1B":{x:300,y:230}, "2B":{x:200,y:130}, "3B":{x:100,y:230},
  P:{x:200,y:220}, C:{x:200,y:345},
  "1Bf":{x:310,y:180}, "2Bf":{x:250,y:135}, SS:{x:150,y:135}, "3Bf":{x:90,y:180},
  LF:{x:60,y:110}, CF:{x:140,y:60}, SF:{x:260,y:60}, RF:{x:340,y:110},
  "past1B":{x:350,y:230}, "past3B":{x:50,y:230}, "pastHOME":{x:200,y:370}, "past2B":{x:200,y:90},
};

const FIELDERS = [
  {label:"P", x:200, y:220},
  {label:"C", x:200, y:345},
  {label:"1B", x:310, y:180},
  {label:"2B", x:250, y:135},
  {label:"SS", x:150, y:135},
  {label:"3B", x:90, y:180},
  {label:"LF", x:60, y:110},
  {label:"CF", x:140, y:60},
  {label:"SF", x:260, y:60},
  {label:"RF", x:340, y:110},
];

const SCENARIOS = [
  // ===================== PITCHER (P) =====================
  {
    id:5, positions:["P"], category:"Pitcher",
    situation:"Runner on 3rd. Fly ball to left field. The runner tags up and the left fielder throws home!",
    question:"You're the PITCHER. What's your job?",
    runners:["3B"], yourPosition:"P", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}, {from:"LF", to:"HOME", type:"throw"}],
    options:[
      {text:"Go back to the mound", correct:false, feedback:"Not yet! There's a play happening at home plate that needs backup!"},
      {text:"Back up home plate behind the catcher", correct:true, feedback:"Smart play! If the ball gets past the catcher, you're the last line of defense!"},
      {text:"Cover 1st base", correct:false, feedback:"Nobody is running to 1st right now!"}
    ],
  },
  {
    id:7, positions:["P"], category:"Pitcher",
    situation:"Nobody on base. Ground ball hit to the 3rd baseman who throws to 1st.",
    question:"You're the PITCHER. Where do you go after the pitch?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"1Bf", type:"throw"}],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"You need to move! Pitchers have a job on every play."},
      {text:"Run to cover the area toward 1st base", correct:true, feedback:"Yes! Pitchers break toward 1st base on ground balls to the right side."},
      {text:"Run to back up 3rd base", correct:false, feedback:"The 3rd baseman already has the ball."}
    ],
  },
  {
    id:23, positions:["P"], category:"Pitcher",
    situation:"You're the pitcher. The batter hits a ground ball to the 1st baseman.",
    question:"Where do you go?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"The 1st baseman has to field the ball! Someone needs to cover the bag!"},
      {text:"Run to cover 1st base", correct:true, feedback:"That is right! When the 1st baseman fields the ball, the pitcher MUST cover the bag!"},
      {text:"Run home", correct:false, feedback:"No play at home right now. Cover 1st!"}
    ],
  },
  {
    id:33, positions:["P"], category:"Pitcher",
    situation:"Nobody on base. Single hit into left field. The batter-runner rounds 1st and tries to stretch it to 2nd!",
    question:"You're the PITCHER. Where do you go?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}, {from:"LF", to:"2B", type:"throw"}],
    options:[
      {text:"Stay on the pitcher's mound", correct:false, feedback:"Never stand still! If the throw from left field is wild, the batter-runner takes an extra base!"},
      {text:"Run to a spot well behind 2nd base", correct:true, feedback:"Smart! The batter-runner is heading to 2nd, so line yourself up behind the bag to catch any overthrows."},
      {text:"Run to 1st base", correct:false, feedback:"The batter-runner already passed 1st. The throw is going to 2nd!"}
    ],
  },
  {
    id:34, positions:["P"], category:"Pitcher",
    situation:"Runner on 1st base. Single hit into left field.",
    question:"You're the PITCHER. What base should you be backing up?",
    runners:["1B"], yourPosition:"P", emoji:"🏃",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}, {from:"LF", to:"3B", type:"throw"}],
    options:[
      {text:"Back up 2nd base", correct:false, feedback:"The runner from 1st is headed to 3rd. That is where the big play is!"},
      {text:"Back up 3rd base in foul territory", correct:true, feedback:"YES! Get deep into foul territory behind 3rd. You're the only one who can stop a run if the throw is wild!"},
      {text:"Stay on the mound", correct:false, feedback:"Move! You are the most important backup player on the field right now."}
    ],
  },
  {
    id:36, positions:["P"], category:"Pitcher",
    situation:"Nobody on base. Ground ball to the 3rd baseman who throws to 1st.",
    question:"You're the PITCHER. Where do you go?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Stay on the mound and watch", correct:false, feedback:"Never just watch! You have a job on every single play!"},
      {text:"Move toward the 1st base line in case of a bad throw", correct:true, feedback:"Yes! Pitchers should always move toward the play. If the throw is off, you can help!"},
      {text:"Cover home plate", correct:false, feedback:"Nobody is running home. Move toward where the action is!"}
    ],
  },
  {
    id:37, positions:["P"], category:"Pitcher",
    situation:"Runner on 2nd base. Base hit to center field. The runner is heading home!",
    question:"You're the PITCHER. Where do you go?",
    runners:["2B"], yourPosition:"P", emoji:"🏃",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}, {from:"CF", to:"HOME", type:"throw"}],
    options:[
      {text:"Back up home plate", correct:true, feedback:"PERFECT! When a throw is coming home, the pitcher backs up the catcher. If the ball gets past, you stop the run!"},
      {text:"Cover 2nd base", correct:false, feedback:"The big play is at home! Get behind the catcher!"},
      {text:"Stay on the mound", correct:false, feedback:"The throw is coming to home plate. Get behind the catcher NOW!"}
    ],
  },
  {
    id:41, positions:["P"], category:"Pitcher",
    situation:"Runner on 3rd base. Ground ball to the shortstop who throws to 1st.",
    question:"You're the PITCHER. What do you do after the throw goes to 1st?",
    runners:["3B"], yourPosition:"P", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"1B", type:"throw"}],
    options:[
      {text:"Walk back to the mound", correct:false, feedback:"The runner on 3rd could try to score! You need to be ready at home!"},
      {text:"Move toward home plate to back up the catcher in case the runner goes", correct:true, feedback:"YES! With a runner on 3rd, always be ready to cover home after the play at 1st."},
      {text:"Run to back up 1st base", correct:false, feedback:"The right fielder backs up 1st. You need to watch that runner on 3rd!"}
    ],
  },
  {
    id:42, positions:["P"], category:"Pitcher",
    situation:"Runners on 1st and 2nd. Fly ball to right field is caught. Runners tag up!",
    question:"You're the PITCHER. Where do you go?",
    runners:["1B","2B"], yourPosition:"P", emoji:"🏃",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}, {from:"RF", to:"3B", type:"throw"}],
    options:[
      {text:"Go back to the mound", correct:false, feedback:"The play isn't over! The runner from 2nd is tagging up to 3rd!"},
      {text:"Back up 3rd base on the throw from right field", correct:true, feedback:"Great awareness! The throw is going to 3rd, and if it gets past, the runner could score!"},
      {text:"Cover 1st base", correct:false, feedback:"The action is at 3rd base right now. Get behind 3rd!"}
    ],
  },
  {
    id:44, positions:["P"], category:"Pitcher",
    situation:"Runner on 2nd. Single hit into right center. The runner rounds 3rd and heads home!",
    question:"You're the PITCHER. What is your job?",
    runners:["2B"], yourPosition:"P", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SF", type:"hit"}, {from:"SF", to:"HOME", type:"throw"}],
    options:[
      {text:"Back up home plate behind the catcher", correct:true, feedback:"PERFECT! You are the last line of defense. If the throw gets past the catcher, you save the extra base!"},
      {text:"Cover 2nd base", correct:false, feedback:"The play is at home! Get behind the catcher!"},
      {text:"Stay near the mound", correct:false, feedback:"Close, but not enough! Get all the way behind home plate!"}
    ],
  },
  {
    id:46, positions:["P"], category:"Pitcher",
    situation:"Runner on 3rd. Fly ball caught in center field. The runner tags up!",
    question:"You're the PITCHER. Where should you be?",
    runners:["3B"], yourPosition:"P", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}, {from:"CF", to:"HOME", type:"throw"}],
    options:[
      {text:"On the mound waiting for the ball back", correct:false, feedback:"The runner is tagging and heading home! A throw is coming to the plate!"},
      {text:"Behind home plate backing up the catcher", correct:true, feedback:"YES! The throw is coming home and you need to be behind the catcher in case it gets through!"},
      {text:"Covering 3rd base", correct:false, feedback:"The runner already left 3rd. The play is at home!"}
    ],
  },
  {
    id:100, positions:["P"], category:"Pitcher",
    situation:"Ground ball hit right back to you on the mound. Runner on 1st.",
    question:"You're the PITCHER. You field the ball cleanly. What do you do?",
    runners:["1B"], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:"P", type:"hit"}],
    options:[
      {text:"Throw to 2nd base for the force", correct:true, feedback:"Great! Get the lead runner! A quick throw to 2nd starts the double play!"},
      {text:"Throw to 1st base", correct:false, feedback:"You can get the out at 1st, but getting the lead runner at 2nd is the smarter play!"},
      {text:"Run toward 1st and tag the runner yourself", correct:false, feedback:"The batter-runner is behind you heading to 1st. Throw to 2nd for the force!"}
    ],
  },
  {
    id:101, positions:["P"], category:"Pitcher",
    situation:"Bunt is laid down the 1st base line. The 1st baseman charges to field it.",
    question:"You're the PITCHER. What's your job?",
    runners:[], yourPosition:"P", emoji:"⚾",
    ballPath:[{from:"HOME", to:{x:270,y:280}, type:"hit"}],
    options:[
      {text:"Stay on the mound", correct:false, feedback:"The 1st baseman left the bag! Someone needs to cover it!"},
      {text:"Sprint to cover 1st base", correct:true, feedback:"YES! When the 1st baseman fields a bunt, the pitcher MUST cover 1st base!"},
      {text:"Run to field the bunt yourself", correct:false, feedback:"The 1st baseman already has it. Get to the bag!"}
    ],
  },

  // ===================== CATCHER (C) =====================
  {
    id:32, positions:["C"], category:"Catcher",
    situation:"Nobody on base. Ground ball to the shortstop.",
    question:"You're the CATCHER. What is your job?",
    runners:[], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"1B", type:"throw"}],
    options:[
      {text:"Stay at home plate and watch", correct:false, feedback:"Don't just watch! If the throw is wild, the runner gets 2nd base for free."},
      {text:"Run down the line to back up 1st base", correct:true, feedback:"PERFECT! Always trail the runner to 1st on infield grounders. You are the safety net!"},
      {text:"Run to the mound", correct:false, feedback:"The play is at 1st base. Get down there to help your teammate!"}
    ],
  },
  {
    id:35, positions:["C"], category:"Catcher",
    situation:"Nobody on base. Ground ball to the 2nd baseman who throws to 1st.",
    question:"You're the CATCHER. What should you do?",
    runners:[], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Stay behind home plate", correct:false, feedback:"Don't just stand there! The throw could get past the 1st baseman!"},
      {text:"Trail the batter-runner down toward 1st base", correct:true, feedback:"That is right! Catchers trail every ground ball play to 1st. You are the last line of defense!"},
      {text:"Run to cover 3rd base", correct:false, feedback:"Nobody is heading to 3rd. The play is at 1st base!"}
    ],
  },
  {
    id:110, positions:["C"], category:"Catcher",
    situation:"Pop fly goes straight up behind home plate.",
    question:"You're the CATCHER. What should you do first?",
    runners:[], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:{x:200,y:360}, type:"hit"}],
    options:[
      {text:"Look up immediately and try to catch it", correct:false, feedback:"Take your mask off first! It blocks your view and makes it harder to catch!"},
      {text:"Rip off your mask, find the ball, then make the catch", correct:true, feedback:"YES! Step 1: mask off. Step 2: find the ball. Step 3: squeeze it!"},
      {text:"Let someone else get it", correct:false, feedback:"That's your ball! Pop flies behind the plate belong to the catcher!"}
    ],
  },
  {
    id:111, positions:["C"], category:"Catcher",
    situation:"Runner on 3rd base. Ground ball to shortstop. The shortstop throws to 1st for the out.",
    question:"You're the CATCHER. What do you watch for?",
    runners:["3B"], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"1B", type:"throw"}],
    options:[
      {text:"Relax, the out was made at 1st", correct:false, feedback:"The runner on 3rd might try to score while the throw goes to 1st! Stay ready!"},
      {text:"Watch the runner on 3rd and be ready for a play at home", correct:true, feedback:"Heads up! The runner could break for home during the throw to 1st. Be ready to receive!"},
      {text:"Run to back up 1st base", correct:false, feedback:"You need to stay home! If the runner on 3rd goes, you're the only one there!"}
    ],
  },
  {
    id:112, positions:["C"], category:"Catcher",
    situation:"Wild pitch bounces to the backstop. Runner on 2nd base.",
    question:"You're the CATCHER. What do you do?",
    runners:["2B"], yourPosition:"C", emoji:"⚡",
    ballPath:[{from:"P", to:{x:200,y:370}, type:"overthrow"}],
    options:[
      {text:"Turn and sprint to the ball, then look for the runner", correct:true, feedback:"Great! Get to the ball fast, pick it up, and check if the runner is trying to advance!"},
      {text:"Wait for the pitcher to get it", correct:false, feedback:"That's YOUR job! The catcher always chases wild pitches and passed balls!"},
      {text:"Yell for the pitcher and stay at home plate", correct:false, feedback:"You need to go get the ball! Every second counts with a runner on base!"}
    ],
  },
  {
    id:113, positions:["C"], category:"Catcher",
    situation:"Bases loaded, ground ball to the 3rd baseman.",
    question:"You're the CATCHER. What are you ready for?",
    runners:["1B","2B","3B"], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"HOME", type:"throw"}],
    options:[
      {text:"Run to back up 1st base", correct:false, feedback:"With bases loaded, the force is at home! Stay at the plate!"},
      {text:"Stand on home plate and be ready to catch the throw for the force out", correct:true, feedback:"YES! Bases loaded means a force at home. Catch the throw, step on the plate, out!"},
      {text:"Move out of the way", correct:false, feedback:"You ARE the play! Stand on that plate and receive the throw!"}
    ],
  },
  {
    id:114, positions:["C"], category:"Catcher",
    situation:"Bunt is popped up right in front of home plate.",
    question:"You're the CATCHER. Who should catch it?",
    runners:[], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:{x:200,y:310}, type:"hit"}],
    options:[
      {text:"Let the pitcher get it", correct:false, feedback:"You're closer and have a better angle! That's your ball!"},
      {text:"Jump out and catch it yourself", correct:true, feedback:"That's your ball! The catcher is in the best position for pop-ups near home plate!"},
      {text:"Let it drop and play it on the ground", correct:false, feedback:"Catch it! A pop-up is an easy out. Don't let it drop!"}
    ],
  },
  {
    id:115, positions:["C"], category:"Catcher",
    situation:"Nobody on base. The batter hits a slow roller up the 3rd base line.",
    question:"You're the CATCHER. What do you do?",
    runners:[], yourPosition:"C", emoji:"🏃",
    ballPath:[{from:"HOME", to:{x:140,y:290}, type:"hit"}],
    options:[
      {text:"Stay at home plate", correct:false, feedback:"That ball might not make it to the 3rd baseman! Get out and field it!"},
      {text:"Sprint out, field the ball, and throw to 1st", correct:true, feedback:"Hustle play! Catchers need to jump on slow rollers near home plate!"},
      {text:"Yell for the pitcher to get it", correct:false, feedback:"You're closer! Take charge and make the play yourself!"}
    ],
  },
  {
    id:116, positions:["C"], category:"Catcher",
    situation:"Runner on 1st. Ground ball to shortstop. The SS throws to 2nd for the force.",
    question:"You're the CATCHER. Where do you go?",
    runners:["1B"], yourPosition:"C", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"2B", type:"throw"}, {from:"2B", to:"1B", type:"throw"}],
    options:[
      {text:"Stay at home plate", correct:false, feedback:"There's a relay throw going to 1st! Trail the play in case of a bad throw!"},
      {text:"Move toward 1st base to back up the throw", correct:true, feedback:"Smart! After the force at 2nd, the relay goes to 1st. You're the safety net!"},
      {text:"Cover 3rd base", correct:false, feedback:"Nobody is going to 3rd. The double play relay is at 1st!"}
    ],
  },

  // ===================== FIRST BASE (1B) =====================
  {
    id:30, positions:["1B"], category:"1st Base",
    situation:"Runner on 1st. No leading off at 8U.",
    question:"Where should you stand at 1st base before the pitch?",
    runners:["1B"], yourPosition:"1B", emoji:"🧠",
    ballPath:[],
    options:[
      {text:"Stand right on the bag", correct:false, feedback:"You don't need to hold runners on! Be ready for a ground ball!"},
      {text:"Stand in your normal fielding position", correct:true, feedback:"That is right! Be in your spot and ready to make a play on the ball!"},
      {text:"Stand behind the runner", correct:false, feedback:"Get in your fielding position!"}
    ],
  },
  {
    id:120, positions:["1B"], category:"1st Base",
    situation:"Ground ball hit right at you at 1st base. Nobody on base.",
    question:"You're the 1ST BASEMAN. You field the ball. What do you do?",
    runners:[], yourPosition:"1B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Throw to the pitcher covering 1st", correct:true, feedback:"YES! When you field the ball away from the bag, toss it to the pitcher who should be running to cover 1st!"},
      {text:"Try to run back to the bag yourself", correct:false, feedback:"The batter-runner is fast! Toss it to the pitcher covering the bag. It's quicker!"},
      {text:"Throw to 2nd base", correct:false, feedback:"Nobody is on base. Just get the out at 1st!"}
    ],
  },
  {
    id:121, positions:["1B"], category:"1st Base",
    situation:"The shortstop throws to you at 1st, but the throw is low and in the dirt.",
    question:"You're the 1ST BASEMAN. What do you do?",
    runners:[], yourPosition:"1B", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"1B", type:"throw"}],
    options:[
      {text:"Stay tall and try to catch it chest-high", correct:false, feedback:"The ball is in the dirt! You need to get low to scoop it!"},
      {text:"Get your glove down and scoop the ball out of the dirt", correct:true, feedback:"Great pick! Keep your foot on the bag and get that glove LOW. Scoop it up!"},
      {text:"Jump out of the way", correct:false, feedback:"Block it! Keep it in front of you even if you can't catch it cleanly!"}
    ],
  },
  {
    id:122, positions:["1B"], category:"1st Base",
    situation:"Pop fly hit in foul territory down the 1st base line.",
    question:"You're the 1ST BASEMAN. What should you do?",
    runners:[], yourPosition:"1B", emoji:"⚾",
    ballPath:[{from:"HOME", to:{x:350,y:260}, type:"hit"}],
    options:[
      {text:"Let the catcher or right fielder get it", correct:false, feedback:"That ball is in your area! You should be going after it!"},
      {text:"Run to the ball, call 'BALL!' and make the catch", correct:true, feedback:"That's yours! Foul pops near 1st base belong to the 1st baseman. Call for it loud!"},
      {text:"Stay on the bag", correct:false, feedback:"Nobody is on base. Go catch that pop fly for an easy out!"}
    ],
  },
  {
    id:123, positions:["1B"], category:"1st Base",
    situation:"Runner on 2nd. Ground ball to the 2nd baseman who throws to you at 1st.",
    question:"You're the 1ST BASEMAN. After catching the throw for the out, what do you check?",
    runners:["2B"], yourPosition:"1B", emoji:"🧠",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Toss the ball back to the pitcher", correct:false, feedback:"Wait! Check the runner first! Did the runner on 2nd try to go to 3rd?"},
      {text:"Look at the runner on 2nd to see if they tried to advance", correct:true, feedback:"Heads up! After every out, check the runners. The runner on 2nd might have gotten greedy!"},
      {text:"Run to 2nd base", correct:false, feedback:"Stay at 1st but look at the runner to see what they're doing!"}
    ],
  },
  {
    id:124, positions:["1B"], category:"1st Base",
    situation:"Bases loaded. Ground ball to the 3rd baseman.",
    question:"You're the 1ST BASEMAN. What are you ready for?",
    runners:["1B","2B","3B"], yourPosition:"1B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"HOME", type:"throw"}, {from:"HOME", to:"1B", type:"throw"}],
    options:[
      {text:"Leave the bag and field ground balls", correct:false, feedback:"The 3B has the ball. Stay on the bag for a possible relay from home!"},
      {text:"Stay on the bag and be ready for a throw after the play at home", correct:true, feedback:"Smart! The 3B might throw home, and the catcher could relay to you at 1st for a double play!"},
      {text:"Cover 2nd base", correct:false, feedback:"You need to stay at 1st base in case the ball comes your way!"}
    ],
  },
  {
    id:125, positions:["1B"], category:"1st Base",
    situation:"Nobody on. The 3rd baseman throws to you but the throw pulls you off the bag toward home.",
    question:"You're the 1ST BASEMAN. What's most important?",
    runners:[], yourPosition:"1B", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Stretch toward the throw but keep your foot on the bag", correct:true, feedback:"YES! Always keep a foot on the bag while stretching for the throw. No foot on the bag = no out!"},
      {text:"Leave the bag to catch the ball cleanly", correct:false, feedback:"If your foot leaves the bag, the runner is safe even if you catch it!"},
      {text:"Let the ball go and hope it hits the runner", correct:false, feedback:"Catch the ball! Stretch toward it and keep your foot on the base!"}
    ],
  },
  {
    id:126, positions:["1B"], category:"1st Base",
    situation:"Runner on 1st base. Ground ball hit to you at 1st base.",
    question:"You're the 1ST BASEMAN. You field the ball. What's the best play?",
    runners:["1B"], yourPosition:"1B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Step on 1st base then throw to 2nd", correct:true, feedback:"Smart! Tag the bag first for one sure out, then look to 2nd if you have time!"},
      {text:"Throw to 2nd base right away", correct:false, feedback:"You're standing right next to 1st! Step on the bag for the sure out first!"},
      {text:"Hold the ball", correct:false, feedback:"Step on the bag! That's a free out right next to you!"}
    ],
  },
  {
    id:127, positions:["1B"], category:"1st Base",
    situation:"Ball hit to right field. Runner on 1st is heading to 2nd.",
    question:"You're the 1ST BASEMAN. Where do you go?",
    runners:["1B"], yourPosition:"1B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Stay at 1st base", correct:false, feedback:"The runner already passed 1st. You need to get in the cutoff line!"},
      {text:"Move into cutoff position between RF and 2nd base", correct:true, feedback:"That's right! You become the cutoff man on balls hit to right field!"},
      {text:"Run out to help the right fielder", correct:false, feedback:"The RF has it. You need to be the cutoff so they have a target to throw to!"}
    ],
  },

  // ===================== SECOND BASE (2B) =====================
  {
    id:24, positions:["2B"], category:"2nd Base",
    situation:"Runner on 1st. Ground ball to the shortstop who throws to 2nd.",
    question:"You're the 2ND BASEMAN. What's your job?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"2B", type:"throw"}],
    options:[
      {text:"Stay at your position", correct:false, feedback:"The throw is going to 2nd base! Someone needs to catch it!"},
      {text:"Run to cover 2nd base to receive the throw", correct:true, feedback:"Exactly! On a ground ball to the SS, the 2nd baseman covers the bag for the force!"},
      {text:"Run to back up 1st base", correct:false, feedback:"The SS is throwing to 2nd, not 1st!"}
    ],
  },
  {
    id:31, positions:["2B"], category:"2nd Base",
    situation:"Ball hit to RF with runners on base.",
    question:"You're the 2ND BASEMAN. Where should you go?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Stay at your position", correct:false, feedback:"When the ball is hit to the outfield, you need to get in cutoff position!"},
      {text:"Go to the cutoff position between RF and the infield", correct:true, feedback:"Yes! The 2nd baseman is the cutoff for throws from right field!"},
      {text:"Cover 1st base", correct:false, feedback:"The 1st baseman covers 1st. You are the cutoff!"}
    ],
  },
  {
    id:48, positions:["2B"], category:"2nd Base",
    situation:"Nobody on base. The batter hits a double into the right center gap.",
    question:"You're the 2ND BASEMAN. What is your job?",
    runners:[], yourPosition:"2B", emoji:"🎯",
    ballPath:[{from:"HOME", to:"SF", type:"hit"}],
    options:[
      {text:"Cover 1st base", correct:false, feedback:"The runner already passed 1st! You need to help get the ball back in!"},
      {text:"Go out toward right center as the relay man", correct:true, feedback:"YES! On balls to right center, the 2nd baseman goes out as the relay so the outfielder has a short throw!"},
      {text:"Stay at your position and wait", correct:false, feedback:"Don't stand still! Get out there and be the relay!"}
    ],
  },
  {
    id:130, positions:["2B"], category:"2nd Base",
    situation:"Nobody on base. Ground ball hit to you at 2nd base.",
    question:"You're the 2ND BASEMAN. You field it cleanly. Where do you throw?",
    runners:[], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}],
    options:[
      {text:"Throw to 1st base", correct:true, feedback:"Get the out! Field it clean and make a strong throw to 1st!"},
      {text:"Throw to 2nd base", correct:false, feedback:"Nobody is going to 2nd! Throw to 1st for the out!"},
      {text:"Run the ball to 1st yourself", correct:false, feedback:"You're too far away! Throw it!"}
    ],
  },
  {
    id:131, positions:["2B"], category:"2nd Base",
    situation:"Runner on 1st. Ground ball to the 1st baseman who fields it.",
    question:"You're the 2ND BASEMAN. Where do you go?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Stay at your normal position", correct:false, feedback:"The 1st baseman left the bag! Someone needs to cover 1st!"},
      {text:"Run to cover 1st base", correct:true, feedback:"Heads up! When the 1st baseman fields a ground ball, the 2nd baseman covers the bag at 1st!"},
      {text:"Cover 2nd base", correct:false, feedback:"The shortstop covers 2nd. You need to get to 1st base!"}
    ],
  },
  {
    id:132, positions:["2B"], category:"2nd Base",
    situation:"Pop fly hit into shallow right field between you and the right fielder.",
    question:"You're the 2ND BASEMAN. What do you do?",
    runners:[], yourPosition:"2B", emoji:"📢",
    ballPath:[{from:"HOME", to:{x:300,y:150}, type:"hit"}],
    options:[
      {text:"Let the right fielder have it since outfielders have priority", correct:false, feedback:"You might be closer! Both players go after it — the one who gets there first calls 'BALL!'"},
      {text:"Go after it hard and call 'BALL!' if you can get there", correct:true, feedback:"That's right! Go after every ball you can reach, and communicate!"},
      {text:"Stop and watch", correct:false, feedback:"Never stop! Go after the ball! Someone needs to make this catch!"}
    ],
  },
  {
    id:133, positions:["2B"], category:"2nd Base",
    situation:"Runner on 2nd and 3rd. Ground ball hit to you.",
    question:"You're the 2ND BASEMAN. Where do you throw?",
    runners:["2B","3B"], yourPosition:"2B", emoji:"🧠",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}],
    options:[
      {text:"Throw home to get the runner from 3rd", correct:false, feedback:"That's a long throw and the runner has a big head start. Get the sure out at 1st!"},
      {text:"Throw to 1st for the sure out", correct:true, feedback:"Smart! Don't try to be a hero. Get the sure out at 1st base!"},
      {text:"Throw to 3rd base", correct:false, feedback:"The runner already left 3rd! Throw to 1st for the out!"}
    ],
  },
  {
    id:134, positions:["2B"], category:"2nd Base",
    situation:"Runner on 1st. You receive the throw at 2nd for the force out. The runner is out.",
    question:"You're the 2ND BASEMAN. What do you do next?",
    runners:["1B"], yourPosition:"2B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"2B", type:"throw"}],
    options:[
      {text:"Celebrate the out", correct:false, feedback:"There might be a double play! Look to throw to 1st!"},
      {text:"Catch, touch the bag, and throw to 1st base to try for the double play", correct:true, feedback:"YES! Catch, tag the bag, and fire to 1st. That's turning two!"},
      {text:"Hold the ball and stay on 2nd", correct:false, feedback:"You got one out but the batter is still running! Throw to 1st!"}
    ],
  },

  // ===================== SHORTSTOP (SS) =====================
  {
    id:25, positions:["SS"], category:"Shortstop",
    situation:"Runner on 2nd. The batter hits a single to left field.",
    question:"You're the SHORTSTOP. Where should you be?",
    runners:["2B"], yourPosition:"SS", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Run out to help the left fielder", correct:false, feedback:"The LF has the ball. You need to be in position for a relay!"},
      {text:"Go to the cutoff position", correct:true, feedback:"Great instinct! Line up between the LF and home plate so you can relay the throw!"},
      {text:"Cover 2nd base", correct:false, feedback:"The runner already left 2nd. Get in the cutoff position!"}
    ],
  },
  {
    id:26, positions:["SS"], category:"Shortstop",
    situation:"Nobody on base. The batter hits a fly ball to left center field.",
    question:"You're the SHORTSTOP. What should you do?",
    runners:[], yourPosition:"SS", emoji:"⚾",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}],
    options:[
      {text:"Go out as the relay", correct:true, feedback:"Yes! Go out as the relay to help the outfielder if the ball drops!"},
      {text:"Stay at your position", correct:false, feedback:"Don't stand still! Go out toward the ball to help!"},
      {text:"Cover 2nd base", correct:false, feedback:"With nobody on base, getting in relay position is more important!"}
    ],
  },
  {
    id:47, positions:["SS"], category:"Shortstop",
    situation:"Nobody on base. The batter hits a double into the left center gap.",
    question:"You're the SHORTSTOP. What is your job?",
    runners:[], yourPosition:"SS", emoji:"🎯",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}],
    options:[
      {text:"Stay at your position", correct:false, feedback:"The ball is in the outfield! You need to get into relay position!"},
      {text:"Go out toward left center as the relay man", correct:true, feedback:"That is it! On balls to left center, the shortstop goes out as the cutoff so the outfielder has a target!"},
      {text:"Cover 2nd base", correct:false, feedback:"Someone else can cover 2nd. Your job is to be the relay!"}
    ],
  },
  {
    id:140, positions:["SS"], category:"Shortstop",
    situation:"Nobody on base. Ground ball hit to you at shortstop.",
    question:"You're the SHORTSTOP. You field it. Where do you throw?",
    runners:[], yourPosition:"SS", emoji:"⚾",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw to 1st base", correct:true, feedback:"Get the out! Field it clean, set your feet, and make a strong throw to 1st!"},
      {text:"Throw to 2nd base", correct:false, feedback:"Nobody is going to 2nd. Throw to 1st for the out!"},
      {text:"Run it to 1st yourself", correct:false, feedback:"You're way too far from 1st base! Throw it over!"}
    ],
  },
  {
    id:141, positions:["SS"], category:"Shortstop",
    situation:"Runner on 2nd. Ground ball hit to you. The runner is not going.",
    question:"You're the SHORTSTOP. What do you do?",
    runners:["2B"], yourPosition:"SS", emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw to 3rd to try to get the runner", correct:false, feedback:"The runner stayed! Don't force a throw to 3rd. Get the sure out at 1st!"},
      {text:"Look the runner back to 2nd, then throw to 1st", correct:true, feedback:"Textbook! Glance at the runner to keep them honest, then get the out at 1st!"},
      {text:"Hold the ball", correct:false, feedback:"You've got time to get the out at 1st. Make the throw!"}
    ],
  },
  {
    id:142, positions:["SS"], category:"Shortstop",
    situation:"Runner on 1st, less than 2 outs. Ground ball hit right at you.",
    question:"You're the SHORTSTOP. What's the best play?",
    runners:["1B"], yourPosition:"SS", emoji:"⚾",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw to 1st for one out", correct:false, feedback:"You can get the lead runner at 2nd! That's the better play!"},
      {text:"Flip to 2nd base to start a double play", correct:true, feedback:"YES! Get the force at 2nd, and the 2nd baseman can relay to 1st for the double play!"},
      {text:"Tag the runner going past you", correct:false, feedback:"The runner from 1st might not be close enough to tag. Flip to 2nd for the force!"}
    ],
  },
  {
    id:143, positions:["SS"], category:"Shortstop",
    situation:"Pop fly hit into shallow left field.",
    question:"You're the SHORTSTOP. What do you do?",
    runners:[], yourPosition:"SS", emoji:"📢",
    ballPath:[{from:"HOME", to:{x:100,y:150}, type:"hit"}],
    options:[
      {text:"Let the left fielder have it", correct:false, feedback:"You might be closer! Go after it and call for it if you can get there!"},
      {text:"Go after it hard. If you can get there, yell 'BALL!'", correct:true, feedback:"That's right! Infielders going back have a better angle than outfielders coming in. Call for it!"},
      {text:"Stay at your position", correct:false, feedback:"Go make the play! That ball is catchable!"}
    ],
  },
  {
    id:144, positions:["SS"], category:"Shortstop",
    situation:"Slow roller hit toward the left side. The 3rd baseman can't get to it.",
    question:"You're the SHORTSTOP. What do you do?",
    runners:[], yourPosition:"SS", emoji:"⚡",
    ballPath:[{from:"HOME", to:{x:120,y:250}, type:"hit"}],
    options:[
      {text:"Stay at your position and let it be a hit", correct:false, feedback:"Hustle! You might be able to get there and make the throw!"},
      {text:"Charge the ball, bare-hand it if needed, and throw to 1st", correct:true, feedback:"Great hustle! Charge in, field it quickly, and fire to 1st. That's how you make the highlight reel!"},
      {text:"Yell for the pitcher to get it", correct:false, feedback:"You're closer! Go make the play!"}
    ],
  },

  // ===================== THIRD BASE (3B) =====================
  {
    id:150, positions:["3B"], category:"3rd Base",
    situation:"Nobody on base. Ground ball hit to you at 3rd base.",
    question:"You're the 3RD BASEMAN. You field it. What do you do?",
    runners:[], yourPosition:"3B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}],
    options:[
      {text:"Throw to 1st base", correct:true, feedback:"Get the out! Set your feet and make a strong throw across the diamond to 1st!"},
      {text:"Run the ball to 1st", correct:false, feedback:"Way too far to run! Throw it!"},
      {text:"Throw to 2nd base", correct:false, feedback:"Nobody is going to 2nd. Throw to 1st!"}
    ],
  },
  {
    id:151, positions:["3B"], category:"3rd Base",
    situation:"Bunt laid down the 3rd base line. Nobody on base.",
    question:"You're the 3RD BASEMAN. What do you do?",
    runners:[], yourPosition:"3B", emoji:"⚡",
    ballPath:[{from:"HOME", to:{x:130,y:290}, type:"hit"}],
    options:[
      {text:"Wait for the ball to come to you", correct:false, feedback:"Charge it! The batter is running hard to 1st. Every second matters!"},
      {text:"Charge the ball, field it, and throw to 1st", correct:true, feedback:"Hustle! Charge in, scoop it up, and fire to 1st!"},
      {text:"Let the catcher get it", correct:false, feedback:"You're closer to the ball! Charge in and make the play!"}
    ],
  },
  {
    id:152, positions:["3B"], category:"3rd Base",
    situation:"Pop fly hit in foul territory down the 3rd base line.",
    question:"You're the 3RD BASEMAN. What do you do?",
    runners:[], yourPosition:"3B", emoji:"⚾",
    ballPath:[{from:"HOME", to:{x:50,y:260}, type:"hit"}],
    options:[
      {text:"Let it go foul and give the batter another chance", correct:false, feedback:"An out is an out! Catch it for the easy out!"},
      {text:"Run to the ball, call 'BALL!' and catch it", correct:true, feedback:"YES! Foul pop-ups near 3rd are yours. Call for it and squeeze it!"},
      {text:"Let the shortstop get it", correct:false, feedback:"That's your territory! Go make the play!"}
    ],
  },
  {
    id:153, positions:["3B"], category:"3rd Base",
    situation:"Runners on 1st and 2nd. Ground ball hit to you at 3rd.",
    question:"You're the 3RD BASEMAN. What's the best play?",
    runners:["1B","2B"], yourPosition:"3B", emoji:"🧠",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}],
    options:[
      {text:"Step on 3rd base for the force out", correct:true, feedback:"Smart! You're standing right there. Step on the bag for the easy force out on the runner from 2nd!"},
      {text:"Throw to 1st base", correct:false, feedback:"You've got a force at 3rd! Step on the bag. It's the easiest out!"},
      {text:"Throw home", correct:false, feedback:"The force is at 3rd. Step on the bag!"}
    ],
  },
  {
    id:154, positions:["3B"], category:"3rd Base",
    situation:"Runner on 3rd, 1 out. Fly ball caught in right field. The runner tags up.",
    question:"You're the 3RD BASEMAN. What do you watch for?",
    runners:["3B"], yourPosition:"3B", emoji:"🧠",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Nothing, just go back to position", correct:false, feedback:"You need to watch the runner! Did they leave 3rd too early?"},
      {text:"Watch the runner's foot to make sure they tag 3rd before running home", correct:true, feedback:"Heads up! If the runner leaves 3rd before the catch, you can get the ball and appeal for the out!"},
      {text:"Run to cover home plate", correct:false, feedback:"The catcher has home. Your job is to watch the tag-up at 3rd!"}
    ],
  },
  {
    id:155, positions:["3B"], category:"3rd Base",
    situation:"Line drive hit right at you at 3rd base. Runner on 1st.",
    question:"You're the 3RD BASEMAN. You catch the line drive! What next?",
    runners:["1B"], yourPosition:"3B", emoji:"⚡",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}],
    options:[
      {text:"Celebrate the catch", correct:false, feedback:"Check the runner! They might not have tagged up!"},
      {text:"Look at the runner on 1st — if they ran, throw to 1st for the double play", correct:true, feedback:"Heads-up ball! If the runner was going on the hit, throw to 1st to double them off!"},
      {text:"Throw to 2nd base", correct:false, feedback:"The runner started on 1st, so throw back to 1st if they left the base!"}
    ],
  },
  {
    id:156, positions:["3B"], category:"3rd Base",
    situation:"Bases loaded. Ground ball hit to you at 3rd.",
    question:"You're the 3RD BASEMAN. Where do you throw?",
    runners:["1B","2B","3B"], yourPosition:"3B", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}],
    options:[
      {text:"Throw home for the force out", correct:true, feedback:"Great decision! With bases loaded, there's a force at every base. Home plate is the best out to get — it stops a run!"},
      {text:"Step on 3rd base", correct:false, feedback:"You could get the out at 3rd, but home plate stops the run! Throw home!"},
      {text:"Throw to 1st", correct:false, feedback:"Get the out at home first! That stops the run from scoring!"}
    ],
  },
  {
    id:157, positions:["3B"], category:"3rd Base",
    situation:"Hard ground ball hit to your right, toward shortstop. The SS is too far away.",
    question:"You're the 3RD BASEMAN. What do you do?",
    runners:[], yourPosition:"3B", emoji:"⚡",
    ballPath:[{from:"HOME", to:{x:130,y:200}, type:"hit"}],
    options:[
      {text:"Let the shortstop get it", correct:false, feedback:"The SS can't reach it! You need to range to your left!"},
      {text:"Dive or range to your left, field the ball, and throw to 1st", correct:true, feedback:"That's how you play hot corner! Range to your left, get in front of it, and fire to 1st!"},
      {text:"Stay in your position", correct:false, feedback:"You've got to go get that ball! Range to your left!"}
    ],
  },
  {
    id:158, positions:["3B"], category:"3rd Base",
    situation:"Ball hit to left field with a runner on 1st. The LF throws to 3rd.",
    question:"You're the 3RD BASEMAN. What should you be doing?",
    runners:["1B"], yourPosition:"3B", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}, {from:"LF", to:"3B", type:"throw"}],
    options:[
      {text:"Standing off the bag in fielding position", correct:false, feedback:"A throw is coming! Get to the bag to receive it!"},
      {text:"Get to 3rd base and be ready to catch the throw and tag the runner", correct:true, feedback:"YES! The runner from 1st might try to take 3rd. Be on the bag and ready to tag!"},
      {text:"Back up the left fielder", correct:false, feedback:"The LF has the ball and is throwing to you! Get to the bag!"}
    ],
  },

  // ===================== LEFT FIELD (LF) =====================
  {
    id:8, positions:["LF"], category:"Left Field",
    situation:"Runner on 1st and 2nd. The batter hits a single to right field. The right fielder throws to 3rd base!",
    question:"You're the LEFT FIELDER. What do you do?",
    runners:["1B","2B"], yourPosition:"LF", emoji:"💪",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}, {from:"RF", to:"3B", type:"throw"}],
    options:[
      {text:"Stay in left field and watch", correct:false, feedback:"Never just watch! If that throw gets past 3rd, someone needs to be there!"},
      {text:"Run to back up 3rd base", correct:true, feedback:"Heads-up play! Left fielders back up 3rd base on throws from right field."},
      {text:"Run to cover 2nd base", correct:false, feedback:"You need to back up where the throw is going. It is at 3rd base!"}
    ],
  },
  {
    id:38, positions:["LF"], category:"Left Field",
    situation:"Runner on 1st base. Single hit into right field. The runner rounds 2nd and heads to 3rd.",
    question:"You're the LEFT FIELDER. What is your job?",
    runners:["1B"], yourPosition:"LF", emoji:"💪",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}, {from:"RF", to:"3B", type:"throw"}],
    options:[
      {text:"Stay in left field", correct:false, feedback:"If the throw from RF gets past 3rd, the runner scores! You need to be there!"},
      {text:"Run to back up 3rd base", correct:true, feedback:"Heads-up play! Left fielders always back up 3rd base on throws from the right side of the field."},
      {text:"Run to cover 2nd base", correct:false, feedback:"The throw is going to 3rd. Back up where the ball is going!"}
    ],
  },
  {
    id:160, positions:["LF"], category:"Left Field",
    situation:"Fly ball hit to you in left field. Nobody on base.",
    question:"You're the LEFT FIELDER. You catch it. What do you do with the ball?",
    runners:[], yourPosition:"LF", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Throw it as hard as you can toward home plate", correct:false, feedback:"Nobody is running! Just throw it back to the cutoff or infield calmly."},
      {text:"Throw it to the cutoff man", correct:true, feedback:"Good fundamentals! Hit the cutoff. No need to overthrow when nobody is running."},
      {text:"Hold the ball and run it in", correct:false, feedback:"Get rid of the ball! Throw it to the infield through the cutoff."}
    ],
  },
  {
    id:161, positions:["LF"], category:"Left Field",
    situation:"Ground ball base hit to left field. Runner on 2nd is heading home.",
    question:"You're the LEFT FIELDER. Where do you throw?",
    runners:["2B"], yourPosition:"LF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Throw it to the shortstop cutoff man", correct:true, feedback:"YES! Hit the cutoff! The SS will either relay it home or hold it depending on the play."},
      {text:"Throw directly home", correct:false, feedback:"That's a long throw! Hit the cutoff man. They can relay it home faster and more accurately."},
      {text:"Throw to 3rd base", correct:false, feedback:"The runner is past 3rd! Hit the cutoff man who is lined up to home!"}
    ],
  },
  {
    id:162, positions:["LF"], category:"Left Field",
    situation:"Ground ball goes through the infield into left field. Nobody on base.",
    question:"You're the LEFT FIELDER. How do you field the ball?",
    runners:[], yourPosition:"LF", emoji:"⚾",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Wait for it to come to you", correct:false, feedback:"Charge the ball! The batter is running and every second counts!"},
      {text:"Charge the ball aggressively and field it on the run", correct:true, feedback:"Hustle! Get to the ball fast to hold the runner to a single!"},
      {text:"Let it roll to see if it goes foul", correct:false, feedback:"You're in the outfield — the ball can't go foul out here! Charge it!"}
    ],
  },
  {
    id:163, positions:["LF"], category:"Left Field",
    situation:"Fly ball hit in the gap between you and center field.",
    question:"You're the LEFT FIELDER. What do you do?",
    runners:[], yourPosition:"LF", emoji:"📢",
    ballPath:[{from:"HOME", to:{x:100,y:80}, type:"hit"}],
    options:[
      {text:"Let the center fielder take it since they have priority", correct:false, feedback:"Go after it! Whoever gets there first calls for it!"},
      {text:"Run hard to the ball. If you can get there, yell 'BALL!'", correct:true, feedback:"That's right! Both players go hard. Whoever is closer calls it, the other backs up!"},
      {text:"Stop and watch", correct:false, feedback:"Never stop moving! Go after every ball!"}
    ],
  },
  {
    id:164, positions:["LF"], category:"Left Field",
    situation:"Infield ground ball to the shortstop. Nobody on base.",
    question:"You're the LEFT FIELDER. What should you be doing?",
    runners:[], yourPosition:"LF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"1B", type:"throw"}],
    options:[
      {text:"Standing still and watching", correct:false, feedback:"You should always be moving toward the play!"},
      {text:"Moving toward the infield in case of a bad throw or missed ball", correct:true, feedback:"Good awareness! Always creep in on ground balls in case the ball gets through the infield."},
      {text:"Running to back up 1st base", correct:false, feedback:"That's the right fielder's job. You back up the left side of the infield!"}
    ],
  },
  {
    id:165, positions:["LF"], category:"Left Field",
    situation:"Runner on 2nd. Ground ball to the 3rd baseman who throws to 1st.",
    question:"You're the LEFT FIELDER. What should you be ready for?",
    runners:["2B"], yourPosition:"LF", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Nothing, the play is at 1st", correct:false, feedback:"The runner on 2nd might try to advance to 3rd! Be ready to back up!"},
      {text:"Move in to back up 3rd base in case the runner on 2nd tries to advance", correct:true, feedback:"Smart! While the throw goes to 1st, the runner might sneak to 3rd. Back up that base!"},
      {text:"Run to back up 1st base", correct:false, feedback:"That's the right fielder's job. You cover the left side!"}
    ],
  },

  // ===================== CENTER FIELD (CF) =====================
  {
    id:16, positions:["CF"], category:"Center Field",
    situation:"Runner on 1st. Ground ball to 2nd baseman. The flip to 2nd goes wide!",
    question:"You're the CENTER FIELDER. What do you do?",
    runners:["1B"], yourPosition:"CF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"past2B", type:"overthrow"}],
    options:[
      {text:"Stay where you are", correct:false, feedback:"The ball got past 2nd base! If nobody is there, the runner could score!"},
      {text:"Run to back up 2nd base", correct:true, feedback:"Perfect! The flip went toward your side. Back up 2nd to stop runners from advancing!"},
      {text:"Run to back up 1st base", correct:false, feedback:"The ball went past 2nd base, not 1st!"}
    ],
  },
  {
    id:39, positions:["CF"], category:"Center Field",
    situation:"Runner on 2nd base. Ground ball to 1st baseman who fields it and throws to the shortstop covering 2nd.",
    question:"You're the CENTER FIELDER. What should you do?",
    runners:["2B"], yourPosition:"CF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}, {from:"1Bf", to:"2B", type:"throw"}],
    options:[
      {text:"Stay in center field", correct:false, feedback:"If the throw gets past 2nd, the runner could score! Hustle in!"},
      {text:"Run in to back up 2nd base", correct:true, feedback:"That is it! You are in the best position to stop a bad throw from getting into the outfield."},
      {text:"Back up home plate", correct:false, feedback:"The throw is going to 2nd base. Back up where the ball is headed!"}
    ],
  },
  {
    id:45, positions:["CF"], category:"Center Field",
    situation:"Runner on 1st. Ground ball to the 2nd baseman who flips to the shortstop covering 2nd.",
    question:"You're the CENTER FIELDER. What do you do?",
    runners:["1B"], yourPosition:"CF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"2B", type:"throw"}],
    options:[
      {text:"Stay where you are", correct:false, feedback:"If that flip goes wide, the ball is headed right at you. Be ready!"},
      {text:"Move in behind 2nd base to back up the throw", correct:true, feedback:"That is right! On any throw to 2nd, outfielders behind the play need to move in as backup."},
      {text:"Move toward left field", correct:false, feedback:"You are moving the wrong way! The throw is at 2nd base!"}
    ],
  },
  {
    id:170, positions:["CF"], category:"Center Field",
    situation:"Fly ball hit to you in center field. The left fielder and right fielder are both coming over.",
    question:"You're the CENTER FIELDER. What do you do?",
    runners:[], yourPosition:"CF", emoji:"📢",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}],
    options:[
      {text:"Let one of the other outfielders take it", correct:false, feedback:"Center field has priority on fly balls! Take charge!"},
      {text:"Call 'BALL! BALL! BALL!' loud and clear — you have priority", correct:true, feedback:"YES! The center fielder is the captain of the outfield. If you can get there, it's YOUR ball!"},
      {text:"Quietly try to catch it", correct:false, feedback:"You need to yell so the other fielders know to back off! Communicate!"}
    ],
  },
  {
    id:171, positions:["CF"], category:"Center Field",
    situation:"Ground ball single through the infield to center. Runner on 1st is heading to 2nd.",
    question:"You're the CENTER FIELDER. Where do you throw?",
    runners:["1B"], yourPosition:"CF", emoji:"⚾",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}],
    options:[
      {text:"Throw directly to 2nd base", correct:false, feedback:"The runner is probably going to make 2nd. Look at where the lead runner is going!"},
      {text:"Charge the ball and throw to the cutoff man lined up to 3rd", correct:true, feedback:"Heads up! Get the ball in fast. The cutoff decides where it goes based on the lead runner!"},
      {text:"Hold the ball and run it in", correct:false, feedback:"Get rid of it! Every second you hold it, runners advance!"}
    ],
  },
  {
    id:172, positions:["CF"], category:"Center Field",
    situation:"Deep fly ball over your head. You're running back.",
    question:"You're the CENTER FIELDER. How should you run?",
    runners:[], yourPosition:"CF", emoji:"🏃",
    ballPath:[{from:"HOME", to:{x:140,y:20}, type:"hit"}],
    options:[
      {text:"Run backwards while watching the ball", correct:false, feedback:"You're much slower running backwards! Turn and sprint!"},
      {text:"Turn, sprint to where the ball is going, then look up for the catch", correct:true, feedback:"That's the way! Drop step, turn, sprint to the spot, and look up at the last second!"},
      {text:"Stay where you are and hope it comes to you", correct:false, feedback:"The ball is over your head! You have to go back for it!"}
    ],
  },
  {
    id:173, positions:["CF"], category:"Center Field",
    situation:"Ground ball goes through to center. Nobody on base. The batter rounds 1st.",
    question:"You're the CENTER FIELDER. How do you field the ball?",
    runners:[], yourPosition:"CF", emoji:"⚾",
    ballPath:[{from:"HOME", to:"CF", type:"hit"}],
    options:[
      {text:"Field it casually since nobody is on base", correct:false, feedback:"The batter might try for 2nd! Get to the ball fast!"},
      {text:"Charge hard, get in front of it, and throw to the cutoff quickly", correct:true, feedback:"Hustle! Even with nobody on, aggressive fielding holds runners to singles!"},
      {text:"Wait for it to stop rolling", correct:false, feedback:"Every second counts! Charge the ball!"}
    ],
  },
  {
    id:174, positions:["CF"], category:"Center Field",
    situation:"Fly ball hit to left field. The left fielder is camped under it.",
    question:"You're the CENTER FIELDER. What should you be doing?",
    runners:["1B"], yourPosition:"CF", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Stay in center and relax", correct:false, feedback:"Always back up your fellow outfielders! What if they drop it?"},
      {text:"Run toward the left fielder to back them up in case they drop it", correct:true, feedback:"Great teammate! Always back up the other outfielders on fly balls. If they drop it, you're right there!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"The infield covers 2nd. Your job is to back up the LF!"}
    ],
  },

  // ===================== RIGHT FIELD (RF) =====================
  {
    id:1, positions:["RF"], category:"Right Field",
    situation:"Runner on 2nd. Ground ball to shortstop. The shortstop looks the runner back and throws to 1st, but the throw goes wild!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:["2B"], yourPosition:"RF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"past1B", type:"overthrow"}],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"We need you closer! Always back up 1st base on throws from the infield."},
      {text:"Run to back up 1st base", correct:true, feedback:"YES! Right fielders always back up 1st base on infield throws. Great hustle!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"Backing up 1st base is your #1 job on this play."}
    ],
  },
  {
    id:2, positions:["RF"], category:"Right Field",
    situation:"Runner on 2nd. Ground ball to the 3rd baseman. The 3rd baseman throws to 1st, but the throw sails past the 1st baseman!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:["2B"], yourPosition:"RF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"past1B", type:"overthrow"}],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base. If nobody is there, the runner could take extra bases!"},
      {text:"Run to back up 1st base", correct:true, feedback:"Awesome! Right fielders always back up 1st base on overthrows from the infield."},
      {text:"Run to cover 2nd base", correct:false, feedback:"The throw went to 1st base, so that is where you need to back up!"}
    ],
  },
  {
    id:4, positions:["RF"], category:"Right Field",
    situation:"Runner on 2nd. Ground ball to 2nd baseman. The throw to 1st is on target, but the 1st baseman drops it!",
    question:"You're the RIGHT FIELDER. Where should you already be?",
    runners:["2B"], yourPosition:"RF", emoji:"👏",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}, {from:"2Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Standing in right field", correct:false, feedback:"You should have been moving the moment the ball was hit!"},
      {text:"Behind 1st base, ready to grab the dropped ball", correct:true, feedback:"PERFECT! You were already backing up because you started running as soon as the ball was hit!"},
      {text:"Running toward 2nd base", correct:false, feedback:"The throw is going to 1st base. That is where you need to be backing up!"}
    ],
  },
  {
    id:15, positions:["RF"], category:"Right Field",
    situation:"Nobody on base. Ground ball to shortstop. The throw to 1st goes wild!",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:[], yourPosition:"RF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"past1B", type:"overthrow"}],
    options:[
      {text:"Stay in right field and watch", correct:false, feedback:"The ball got past 1st base! If nobody backs it up, the batter takes extra bases!"},
      {text:"Run to back up 1st base", correct:true, feedback:"Great hustle! Right fielders ALWAYS back up 1st base on infield throws."},
      {text:"Run to cover 2nd base", correct:false, feedback:"First, back up 1st base where the throw is going!"}
    ],
  },
  {
    id:43, positions:["RF"], category:"Right Field",
    situation:"Nobody on base. Ground ball to the shortstop who throws to 1st.",
    question:"You're the RIGHT FIELDER. What should you already be doing?",
    runners:[], yourPosition:"RF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"1B", type:"throw"}],
    options:[
      {text:"Standing still and watching the play", correct:false, feedback:"You should be moving the moment the ball is hit! Every throw to 1st needs a backup!"},
      {text:"Running toward 1st base to back up the throw", correct:true, feedback:"That is hustle! Right fielders back up EVERY throw to 1st base. Start moving on contact!"},
      {text:"Moving toward center field", correct:false, feedback:"The throw is going to 1st base. That is where you need to be!"}
    ],
  },
  {
    id:180, positions:["RF"], category:"Right Field",
    situation:"Fly ball hit to you in right field. Runner on 3rd with less than 2 outs.",
    question:"You're the RIGHT FIELDER. You catch it. What do you do?",
    runners:["3B"], yourPosition:"RF", emoji:"⚡",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Throw the ball back to the infield casually", correct:false, feedback:"The runner on 3rd is going to tag up and run home! You need to throw home!"},
      {text:"Catch it and throw home as fast as you can", correct:true, feedback:"Fire it home! The runner is tagging up. A strong throw could save a run!"},
      {text:"Hold the ball to keep the runner at 3rd", correct:false, feedback:"The runner will tag up and score! Throw home immediately!"}
    ],
  },
  {
    id:181, positions:["RF"], category:"Right Field",
    situation:"Ground ball single to right field. Runner on 1st is rounding 2nd.",
    question:"You're the RIGHT FIELDER. Where do you throw?",
    runners:["1B"], yourPosition:"RF", emoji:"⚾",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Throw to 1st base", correct:false, feedback:"The batter already passed 1st! Throw to the cutoff man!"},
      {text:"Hit the cutoff man who is lined up to 3rd base", correct:true, feedback:"Yes! Throw to the cutoff. They'll relay it to 3rd if the runner is trying to advance!"},
      {text:"Hold the ball", correct:false, feedback:"Get rid of it! Throw to the cutoff man!"}
    ],
  },
  {
    id:182, positions:["RF"], category:"Right Field",
    situation:"Ground ball to the 3rd baseman who throws to 1st. You're in right field.",
    question:"You're the RIGHT FIELDER. What should you be doing on this play?",
    runners:[], yourPosition:"RF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"1B", type:"throw"}],
    options:[
      {text:"Watching from right field", correct:false, feedback:"You should be running! Back up EVERY throw to 1st base!"},
      {text:"Running toward 1st base to back up the throw", correct:true, feedback:"That's the right fielder's #1 habit! Back up every single throw to 1st base, every time!"},
      {text:"Moving toward 2nd base", correct:false, feedback:"The play is at 1st. Back up 1st!"}
    ],
  },
  {
    id:183, positions:["RF"], category:"Right Field",
    situation:"Fly ball hit in the gap between you and the short fielder.",
    question:"You're the RIGHT FIELDER. What do you do?",
    runners:[], yourPosition:"RF", emoji:"📢",
    ballPath:[{from:"HOME", to:{x:300,y:80}, type:"hit"}],
    options:[
      {text:"Let the short fielder take it", correct:false, feedback:"Don't assume! Both of you should go after it. The one who gets there first calls it!"},
      {text:"Run hard to the ball and call 'BALL!' if you're going to catch it", correct:true, feedback:"That's right! Go hard, communicate, and the other player backs you up!"},
      {text:"Stop and point at it", correct:false, feedback:"Go get it! Run hard and call for it!"}
    ],
  },

  // ===================== SHORT FIELD (SF) =====================
  {
    id:3, positions:["SF"], category:"Short Field",
    situation:"Runner on 1st. Ground ball to 3rd baseman. The 3rd baseman throws to 2nd for the force, but the throw gets past the shortstop covering 2nd!",
    question:"You're the SHORT FIELDER. What do you do?",
    runners:["1B"], yourPosition:"SF", emoji:"🎯",
    ballPath:[{from:"HOME", to:"3Bf", type:"hit"}, {from:"3Bf", to:"past2B", type:"overthrow"}],
    options:[
      {text:"Run to back up 2nd base", correct:true, feedback:"That is it! The throw got past 2nd base and you're the closest outfielder."},
      {text:"Stay where you are", correct:false, feedback:"If the ball gets past everyone, the runners could advance! Always hustle in!"},
      {text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd."}
    ],
  },
  {
    id:9, positions:["SF"], category:"Short Field",
    situation:"Runners on 1st and 3rd. Ground ball to shortstop. The shortstop throws to 2nd for the force, but the throw gets past the 2nd baseman!",
    question:"You're the SHORT FIELDER. What should you be doing?",
    runners:["1B","3B"], yourPosition:"SF", emoji:"🌟",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"past2B", type:"overthrow"}],
    options:[
      {text:"Stay where you are", correct:false, feedback:"The throw got past 2nd base. If nobody backs it up, runners will advance!"},
      {text:"Run to back up 2nd base", correct:true, feedback:"That is the play! When a throw goes to 2nd base, outfielders nearby need to back it up."},
      {text:"Run to back up 3rd base", correct:false, feedback:"The throw went to 2nd base, not 3rd."}
    ],
  },
  {
    id:40, positions:["SF"], category:"Short Field",
    situation:"Nobody on base. The batter hits a single to right field and tries to stretch it to 2nd.",
    question:"You're the SHORT FIELDER. Where should you be?",
    runners:[], yourPosition:"SF", emoji:"🌟",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}, {from:"RF", to:"2B", type:"throw"}],
    options:[
      {text:"Stay in your normal position", correct:false, feedback:"The throw is coming to 2nd! If it gets through, the runner takes 3rd for free!"},
      {text:"Move in to back up 2nd base on the throw from RF", correct:true, feedback:"Smart! Line yourself up behind 2nd base to catch any overthrow from right field."},
      {text:"Run to back up 1st base", correct:false, feedback:"The runner already passed 1st. The play is at 2nd!"}
    ],
  },
  {
    id:190, positions:["SF"], category:"Short Field",
    situation:"Fly ball hit to shallow right center. You and the right fielder are both nearby.",
    question:"You're the SHORT FIELDER. What do you do?",
    runners:[], yourPosition:"SF", emoji:"📢",
    ballPath:[{from:"HOME", to:{x:290,y:90}, type:"hit"}],
    options:[
      {text:"Let the right fielder take it", correct:false, feedback:"Don't assume! Both go after it and the closer one calls for it!"},
      {text:"Go after it hard. If you're closer, call 'BALL!'", correct:true, feedback:"That's the way! Go after every ball you can reach and communicate!"},
      {text:"Stay back and watch", correct:false, feedback:"Go get it! Never stand still when a ball is in the air!"}
    ],
  },
  {
    id:191, positions:["SF"], category:"Short Field",
    situation:"Ground ball single through the right side of the infield. Nobody on base.",
    question:"You're the SHORT FIELDER. What do you do?",
    runners:[], yourPosition:"SF", emoji:"⚾",
    ballPath:[{from:"HOME", to:"SF", type:"hit"}],
    options:[
      {text:"Wait for the ball to come to you", correct:false, feedback:"Charge it! The batter is running to 1st and maybe thinking about 2nd!"},
      {text:"Charge the ball hard and throw to the cutoff or 2nd base", correct:true, feedback:"Hustle! Get to the ball fast and get it back to the infield!"},
      {text:"Let the right fielder handle it", correct:false, feedback:"That ball came to you! Take charge and field it!"}
    ],
  },
  {
    id:192, positions:["SF"], category:"Short Field",
    situation:"Fly ball hit to the right fielder. Runner on 2nd base.",
    question:"You're the SHORT FIELDER. What should you be doing?",
    runners:["2B"], yourPosition:"SF", emoji:"🛡️",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Stay in your position", correct:false, feedback:"Always back up your fellow outfielders!"},
      {text:"Run toward the right fielder to back them up", correct:true, feedback:"Great teamwork! If the RF drops it, you're right there to pick it up and prevent extra bases!"},
      {text:"Run to cover 2nd base", correct:false, feedback:"The infield has 2nd. Your job is to back up the RF!"}
    ],
  },
  {
    id:193, positions:["SF"], category:"Short Field",
    situation:"Runner on 1st. The SS throws to 2nd for a force out. The 2B relays to 1st.",
    question:"You're the SHORT FIELDER. What's your job during this play?",
    runners:["1B"], yourPosition:"SF", emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}, {from:"SS", to:"2B", type:"throw"}, {from:"2B", to:"1B", type:"throw"}],
    options:[
      {text:"Watch the double play from your position", correct:false, feedback:"You should be moving! Back up the throw to 2nd in case it gets past!"},
      {text:"Move in behind 2nd base to back up the throw", correct:true, feedback:"That's the right move! On any throw to 2nd base, nearby outfielders back it up."},
      {text:"Run to back up 1st base", correct:false, feedback:"That's the RF's job. You back up 2nd base!"}
    ],
  },
  {
    id:194, positions:["SF"], category:"Short Field",
    situation:"Line drive hit into the gap in right center. It gets past the RF. Runner on 1st.",
    question:"You're the SHORT FIELDER. The ball gets past you too. What's most important?",
    runners:["1B"], yourPosition:"SF", emoji:"⚡",
    ballPath:[{from:"HOME", to:{x:320,y:50}, type:"hit"}],
    options:[
      {text:"Give up on the play", correct:false, feedback:"Never give up! Get to the ball as fast as you can!"},
      {text:"Sprint to the ball, pick it up, and throw to the cutoff man ASAP", correct:true, feedback:"Hustle! When the ball gets past you, turn and sprint. Get it back in fast to limit the damage!"},
      {text:"Yell at the right fielder to get it", correct:false, feedback:"You're both going after it! Whoever gets there first, grab it and throw!"}
    ],
  },

  // ===================== BASE RUNNING (ALL POSITIONS) =====================
  {
    id:6, positions:ALL_POS, category:"Base Running",
    situation:"You're on 2nd base. The batter hits a ground ball to the shortstop.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Run to 3rd as fast as you can", correct:false, feedback:"Careful! The shortstop is right there and could tag you easily."},
      {text:"Stay close to 2nd and wait to see what happens", correct:true, feedback:"Smart! On a ground ball hit near you, read the play and don't run into an out!"},
      {text:"Run back to 1st base", correct:false, feedback:"You can't go backwards to a base you already passed!"}
    ],
  },
  {
    id:11, positions:ALL_POS, category:"Base Running",
    situation:"You're on 1st base. The batter hits a ground ball to the 2nd baseman.",
    question:"What should you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"2Bf", type:"hit"}],
    options:[
      {text:"Stay on 1st base", correct:false, feedback:"You have to run! It is a force play. You MUST run to 2nd!"},
      {text:"Run to 2nd base because it's a force play", correct:true, feedback:"That is right! With a runner on 1st, you're FORCED to run to 2nd when the ball is hit on the ground."},
      {text:"Run back toward home plate", correct:false, feedback:"You can't run backwards!"}
    ],
  },
  {
    id:12, positions:ALL_POS, category:"Base Running",
    situation:"You're on 2nd base with no outs. The batter hits a fly ball to right field.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Run to 3rd right away", correct:false, feedback:"If the fielder catches it, you could be doubled off! Wait to see if it's caught."},
      {text:"Go halfway between 2nd and 3rd and watch", correct:true, feedback:"Smart! Go halfway so you can tag up if it's caught, or run if it drops!"},
      {text:"Stay on 2nd base no matter what", correct:false, feedback:"You want to be ready to advance if the ball drops!"}
    ],
  },
  {
    id:13, positions:ALL_POS, category:"Base Running",
    situation:"You're on 3rd base with less than 2 outs. A fly ball is hit deep to left field.",
    question:"What should you do?",
    runners:["3B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Run home right away", correct:false, feedback:"If the fielder catches it, you'll be doubled off! You need to wait on the base."},
      {text:"Go back to 3rd base and get ready to tag up", correct:true, feedback:"Yes! Touch 3rd base and as soon as the fielder catches it, run home!"},
      {text:"Stay halfway between 3rd and home", correct:false, feedback:"On a deep fly, tag up at 3rd so you can score after the catch!"}
    ],
  },
  {
    id:14, positions:ALL_POS, category:"Base Running",
    situation:"You're on 1st base. The batter hits a fly ball to the left fielder who catches it.",
    question:"What do you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Keep running to 2nd base", correct:false, feedback:"The ball was caught. That is an out! Get back to 1st base!"},
      {text:"Get back to 1st base as fast as you can", correct:true, feedback:"Correct! When a fly ball is caught, you need to get back to your base before the ball gets there."},
      {text:"Run to the dugout", correct:false, feedback:"Only the batter is out! You're still a runner. Get back to 1st!"}
    ],
  },
  {
    id:19, positions:ALL_POS, category:"Base Running",
    situation:"You're on 1st base. The batter hits a ground ball right at the 1st baseman.",
    question:"What should you do?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"1Bf", type:"hit"}],
    options:[
      {text:"Stay on 1st base", correct:false, feedback:"You can't stay! It is a force play. Run to 2nd!"},
      {text:"Run hard to 2nd base", correct:true, feedback:"Correct! You're forced to run on a ground ball. Run hard to 2nd!"},
      {text:"Run back toward home plate", correct:false, feedback:"You can never run backwards!"}
    ],
  },
  {
    id:20, positions:ALL_POS, category:"Base Running",
    situation:"You're on 2nd base. The batter hits a single into right field.",
    question:"What should you do?",
    runners:["2B"], yourPosition:null, emoji:"🏃",
    ballPath:[{from:"HOME", to:"RF", type:"hit"}],
    options:[
      {text:"Stay on 2nd base", correct:false, feedback:"On a base hit, you should be running! A single to RF means you can probably score!"},
      {text:"Run to 3rd and look at your coach", correct:true, feedback:"Yes! Run hard and look at your 3rd base coach. Listen to your coaches!"},
      {text:"Run straight home without looking", correct:false, feedback:"Don't put your head down! Look at your coach. They can see the ball!"}
    ],
  },
  {
    id:21, positions:ALL_POS, category:"Base Running",
    situation:"You just hit the ball into the outfield. You're running to 1st base.",
    question:"Should you run straight to 1st base or round it?",
    runners:[], yourPosition:null, emoji:"🏃",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Run straight to 1st and stop", correct:false, feedback:"If the ball is in the outfield, you might be able to get to 2nd!"},
      {text:"Round 1st base and look to see if you can go to 2nd", correct:true, feedback:"That is it! Round 1st and look at your coach and the ball. Go if you can!"},
      {text:"Run past 1st base into right field", correct:false, feedback:"Round the base toward 2nd, not away from it!"}
    ],
  },
  {
    id:22, positions:ALL_POS, category:"Base Running",
    situation:"You hit a ground ball to the infield. You're running to 1st base.",
    question:"How should you run through 1st base?",
    runners:[], yourPosition:null, emoji:"🏃",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Slow down before the bag", correct:false, feedback:"Never slow down! Run full speed all the way through!"},
      {text:"Run full speed straight through the bag", correct:true, feedback:"Yes! Sprint straight through 1st base and don't slow down!"},
      {text:"Slide into 1st base", correct:false, feedback:"Don't slide into 1st! It actually slows you down."}
    ],
  },

  // ===================== GAME SMARTS (ALL POSITIONS) =====================
  {
    id:10, positions:ALL_POS, category:"Game Smarts",
    situation:"There's a pop fly hit high in the air between you and another fielder.",
    question:"What's the MOST important thing to do?",
    runners:[], yourPosition:null, emoji:"📢",
    ballPath:[{from:"HOME", to:{x:200,y:160}, type:"hit"}],
    options:[
      {text:"Just let the other person get it", correct:false, feedback:"What if they think the same thing? Someone needs to call it!"},
      {text:"Yell 'BALL! BALL! BALL!' loud and clear", correct:true, feedback:"YES! Communication wins games! Yell 'BALL!' so everyone knows you've got it."},
      {text:"Both try to catch it at the same time", correct:false, feedback:"That is how collisions happen!"}
    ],
  },
  {
    id:17, positions:ALL_POS, category:"Game Smarts",
    situation:"You catch a ground ball in the infield with a runner on 1st and 1 out.",
    question:"Where should you throw the ball?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw to 2nd base for the force out", correct:true, feedback:"That is right! Get the lead runner. A quick toss to 2nd base is the priority!"},
      {text:"Throw to 1st base", correct:false, feedback:"You could get the out at 1st, but getting the lead runner at 2nd is smarter!"},
      {text:"Hold onto the ball", correct:false, feedback:"You need to make a throw! Get the lead runner at 2nd!"}
    ],
  },
  {
    id:18, positions:ALL_POS, category:"Game Smarts",
    situation:"You're playing outfield. A base hit goes between you and another outfielder.",
    question:"Who should field the ball?",
    runners:[], yourPosition:null, emoji:"📢",
    ballPath:[{from:"HOME", to:{x:300,y:90}, type:"hit"}],
    options:[
      {text:"Let the other fielder get it", correct:false, feedback:"Don't assume! Both need to go after it, and whoever is closest calls for it!"},
      {text:"Both go after it and the closest one yells 'BALL!'", correct:true, feedback:"That is it! The one who gets there first calls 'BALL!' and the other backs them up."},
      {text:"Stop and wait", correct:false, feedback:"Never stop! Every second matters!"}
    ],
  },
  {
    id:27, positions:ALL_POS, category:"Game Smarts",
    situation:"There are 2 outs and a runner on 3rd. A ground ball is hit to you.",
    question:"Where do you throw?",
    runners:["3B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Throw home", correct:false, feedback:"With 2 outs, just get the batter out at 1st! That ends the inning!"},
      {text:"Throw to 1st base for the 3rd out", correct:true, feedback:"Smart! The easiest play is to get the batter at 1st. Inning over!"},
      {text:"Throw to 3rd base", correct:false, feedback:"The runner already left 3rd! Throw to 1st!"}
    ],
  },
  {
    id:28, positions:ALL_POS, category:"Game Smarts",
    situation:"A ground ball is hit right at you and takes a bad hop.",
    question:"What's the MOST important thing to do?",
    runners:[], yourPosition:null, emoji:"🛡️",
    ballPath:[{from:"HOME", to:"SS", type:"hit"}],
    options:[
      {text:"Turn your head away", correct:false, feedback:"If you turn away, you lose the ball! Keep your eyes on it!"},
      {text:"Block the ball with your body", correct:true, feedback:"That is right! Knock it down and keep it in front of you so you can make the throw!"},
      {text:"Jump out of the way", correct:false, feedback:"Be tough. Block it and keep it in front!"}
    ],
  },
  {
    id:29, positions:ALL_POS, category:"Game Smarts",
    situation:"You field a ground ball base hit in the outfield with a runner on 1st.",
    question:"What do you do with the ball?",
    runners:["1B"], yourPosition:null, emoji:"🧠",
    ballPath:[{from:"HOME", to:"LF", type:"hit"}],
    options:[
      {text:"Throw it to home plate", correct:false, feedback:"The runner from 1st is going to 2nd or 3rd. Throw to the cutoff!"},
      {text:"Hit the cutoff man with a quick throw", correct:true, feedback:"Yes! Get the ball to your cutoff fast so they can relay it to the right base!"},
      {text:"Hold the ball", correct:false, feedback:"Running it in takes too long! Hit the cutoff!"}
    ],
  },
];

// ============ DIAMOND SVG BUILDER ============
function buildDiamond(runners=[], yourPosition=null, ballPath=[]) {
  function rp(p) { return (typeof p==="object") ? p : (POS[p]||{x:200,y:200}); }
  let s = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="background:transparent">`;
  
  s += `<circle cx="200" cy="200" r="195" fill="#0a1a0d" />`;
  s += `<circle cx="200" cy="200" r="185" fill="#1b3d21" />`;
  s += `<rect x="100" y="100" width="200" height="200" fill="#5d4037" transform="rotate(45 200 200)" />`;
  s += `<rect x="135" y="135" width="130" height="130" fill="#1b3d21" transform="rotate(45 200 200)" />`;
  s += `<circle cx="200" cy="220" r="15" fill="#5d4037" />`;
  s += `<line x1="200" y1="330" x2="365" y2="165" stroke="rgba(255,255,255,0.4)" stroke-width="2" />`;
  s += `<line x1="200" y1="330" x2="35" y2="165" stroke="rgba(255,255,255,0.4)" stroke-width="2" />`;

  for (const seg of (ballPath || [])) {
    const from=rp(seg.from), to=rp(seg.to);
    let col = seg.type==="hit" ? "#ffffff" : (seg.type==="overthrow" ? "#E63946" : "#3b82f6");
    s += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${col}" stroke-width="5" stroke-dasharray="10,5" />`;
    if (seg === ballPath[ballPath.length-1]) {
        s += `<circle cx="${to.x}" cy="${to.y}" r="8" fill="white" stroke="#000" stroke-width="1" />`;
        s += `<text x="${to.x}" y="${to.y+3}" text-anchor="middle" font-size="8">⚾</text>`;
    }
  }

  const baseCoords = [{x:200,y:330},{x:292,y:200},{x:200,y:108},{x:108,y:200}];
  baseCoords.forEach(b => s += `<rect x="${b.x-6}" y="${b.y-6}" width="12" height="12" fill="#fff" transform="rotate(45 ${b.x} ${b.y})" />`);

  (runners || []).forEach(r => {
    const p = POS[r];
    if (p) {
        s += `<circle cx="${p.x}" cy="${p.y-18}" r="11" fill="#E63946" stroke="#fff" stroke-width="2">
                <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite"/>
              </circle>`;
        s += `<text x="${p.x}" y="${p.y-14}" text-anchor="middle" fill="#fff" font-size="9" font-weight="900">R</text>`;
    }
  });

  for (const f of FIELDERS) {
    const isYou = yourPosition===f.label;
    if (isYou) s += `<circle cx="${f.x}" cy="${f.y}" r="20" fill="none" stroke="#E63946" stroke-width="3" opacity="0.6"><animate attributeName="r" values="18;22;18" dur="1.2s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="${f.x}" cy="${f.y}" r="13" fill="${isYou?'#0B254A':'#222'}" stroke="${isYou?'#fff':'#555'}" stroke-width="1.5"/>`;
    s += `<text x="${f.x}" y="${f.y+4}" text-anchor="middle" fill="#fff" font-size="10" font-weight="900" font-family="sans-serif">${f.label}</text>`;
  }
  return s + `</svg>`;
}

// ============ ENGINE ============
const sounds = {
  hit: new Audio('sounds/hit.mp3'),
  strike: new Audio('sounds/strike.m4a')
};

const walkupSongs = {
  "jackson": new Audio('sounds/jackson.m4a'),
  "andres": new Audio('sounds/andres.m4a'),
  "andrew": new Audio('sounds/andrew.m4a'),
  "caleb": new Audio('sounds/caleb.m4a'),
  "dallas": new Audio('sounds/dallas.m4a'),
  "dominic": new Audio('sounds/dominic.m4a'),
  "elliott": new Audio('sounds/elliott.m4a'),
  "gio": new Audio('sounds/gio.m4a'),
  "johnny": new Audio('sounds/johnny.m4a'),
  "liam": new Audio('sounds/liam.m4a'),
  "matthew": new Audio('sounds/matthew.m4a'),
  "weston": new Audio('sounds/weston.m4a')
};

let currentWalkup = null;
let questions = [], currentQ = 0, score = 0, streak = 0, bestStreak = 0, positionFilter = "All", selected = null;
const $ = (id) => document.getElementById(id);

const POSITION_LIST = ["All", "P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "SF"];

function initMenu() {
  const diamondEl = $("menu-diamond");
  const posBtnsEl = $("position-buttons");
  if (!diamondEl || !posBtnsEl) return; 

  diamondEl.innerHTML = buildDiamond([], null, []);
  
  posBtnsEl.innerHTML = POSITION_LIST.map(p => {
    const count = p === "All" ? SCENARIOS.length : SCENARIOS.filter(s => s.positions.includes(p)).length;
    return `<button class="cat-btn${positionFilter===p?' active':''}" data-pos="${p}">${p} <span style="opacity:0.5;font-size:9px">(${count})</span></button>`;
  }).join("");
  
  document.querySelectorAll(".cat-btn").forEach(btn => btn.addEventListener("click", () => {
    positionFilter = btn.dataset.pos;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }));
}

function startGame() {
  const filtered = positionFilter==="All" ? SCENARIOS : SCENARIOS.filter(s => s.positions.includes(positionFilter));
  questions = filtered.sort(() => Math.random() - 0.5);
  currentQ = 0; score = 0; streak = 0; bestStreak = 0;
  
  if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; currentWalkup = null; }
  const name = $("player-name").value.trim().toLowerCase();
  if (walkupSongs[name]) {
      currentWalkup = walkupSongs[name];
      currentWalkup.play().catch(e => console.log("Audio block:", e));
  }
  
  showScreen("play-screen");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];
  $("q-counter").textContent = `PLAY ${currentQ+1} / ${questions.length}`;
  $("score-display").textContent = `✓ ${score}`;
  $("progress-fill").style.width = `${(currentQ / questions.length) * 100}%`;
  $("cat-badge").textContent = q.category.toUpperCase();
  $("play-diamond").innerHTML = buildDiamond(q.runners, q.yourPosition, q.ballPath);
  $("situation-text").textContent = q.situation;
  $("question-text").textContent = q.question;
  $("options-wrap").innerHTML = q.options.sort(() => Math.random() - 0.5).map(opt => `<button class="option-btn" data-correct="${opt.correct}" data-feedback="${opt.feedback}">${opt.text}</button>`).join("");
  
  document.querySelectorAll(".option-btn").forEach(btn => btn.addEventListener("click", () => handleAnswer(btn)));
  $("feedback").classList.add("hidden");
  $("next-wrap").classList.add("hidden");
  selected = null;
}

function handleAnswer(btn) {
  if (selected) return;
  selected = btn;
  
  if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; currentWalkup = null; }

  const isCorrect = btn.dataset.correct === "true";
  document.querySelectorAll(".option-btn").forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === "true") b.style.borderColor = "var(--team-red)";
  });
  
  if (isCorrect) { 
    sounds.hit.currentTime = 0;
    sounds.hit.play().catch(e => console.log(e)); 
    score++; streak++; 
    if (streak > bestStreak) bestStreak = streak;
  } else { 
    sounds.strike.currentTime = 0;
    sounds.strike.play().catch(e => console.log(e)); 
    streak = 0; 
    btn.style.borderColor = "#ff4444"; 
  }
  
  $("feedback").classList.remove("hidden");
  $("feedback-text").textContent = (isCorrect ? "✅ " : "❌ ") + btn.dataset.feedback;
  $("next-wrap").classList.remove("hidden");
  $("next-btn").textContent = currentQ+1 >= questions.length ? "RESULTS" : "NEXT PLAY →";
}

function showResults() {
  showScreen("results-screen");
  const pct = Math.round((score / questions.length) * 100);
  $("stat-score").textContent = `${score}/${questions.length}`;
  $("stat-pct").textContent = `${pct}%`;
  $("stat-streak").textContent = `${bestStreak}`;
  $("results-grade").textContent = pct >= 80 ? "ALL-STAR! ⭐" : (pct >= 50 ? "GOOD GAME! ⚾" : "KEEP WORKING! 💪");
}

function showScreen(id) {
  ["menu-screen","play-screen","results-screen"].forEach(s => {
    $(s).classList.toggle("hidden", s !== id);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  $("start-btn").addEventListener("click", startGame);
  $("next-btn").addEventListener("click", () => {
    if (currentQ + 1 >= questions.length) showResults(); else { currentQ++; renderQuestion(); }
  });
  $("play-again-btn").addEventListener("click", () => { startGame(); });
  $("main-menu-btn").addEventListener("click", () => { showScreen("menu-screen"); initMenu(); });
  $("quit-btn").addEventListener("click", () => {
    if (currentWalkup) { currentWalkup.pause(); currentWalkup.currentTime = 0; currentWalkup = null; }
    showScreen("menu-screen");
    initMenu();
  });
});

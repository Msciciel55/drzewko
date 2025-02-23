
let nodes = [];
let connections = [];
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let lastX, lastY;
let activeConnections = [];
let tooltipTimeout;
let learnedSkills = new Set();
let blockedSkills = new Set();
let history = [];
let isModalOpen = false;
let zoomLevel = 1; 
const zoomFactor = 0.1;

let skillBlocks = {
 "Farmer T3": ["Mielarz T2", "Mielarz T3","Cieśla T1","Cieśla T2","Cieśla T3","Hutnik T1","Hutnik T2","Hutnik T3"],
 "Farmer T2": ["Miecznik T5", "Płatnerz T5", "Kuśnierz T5", "Kaletnik T5"],
 "Mielarz T1": ["Drwal T3","Górnik T3","Hutnik T3","Hutnik T2","Hutnik T1", "Cieśla T1", "Cieśla T2", "Cieśla T3","Miecznik T5","Płatnerz T5","Kuśnierz T5", "Kaletnik T5","Hutnik T3"],
 "Mielarz T3":["Farmer T3"],
 "Farmer T3":["Mielarz T3"],
 "Farmer T3":["Mielarz T3"],
 "Farmer T1":["Mielarz T3", "Cieśla T3","Hutnik T3"],
 "Farmer T3 + Mielarz T2": ["Drwal T2", "Górnik T2"],
 "Farmer T2 + Mielarz T3": ["Drwal T2", "Górnik T2"],
 "Farmer T3 + Farmer T2": ["Miecznik T4", "Płatnerz T4", "Kuśnierz T4", "Kaletnik T4"],
 "Farmer T1 + Mielarz T1": ["Miecznik T4", "Płatnerz T4", "Kuśnierz T4", "Kaletnik T4"],
 "Farmer T2 + Mielarz T1": ["Miecznik T3", "Płatnerz T3", "Kuśnierz T3", "Kaletnik T3"],
 "Farmer T1 + Mielarz T2": ["Miecznik T3", "Płatnerz T3", "Kuśnierz T3", "Kaletnik T3"],
 "Farmer T3 + Mielarz T2 + Drwal T1": ["Miecznik T2", "Płatnerz T2", "Kuśnierz T2", "Kaletnik T2"],
 "Farmer T3 + Mielarz T2 + Drwal T1 + Górnik T1": ["Kowal","Krawiec","Miecznik T1","Płatnerz T1","Kuśnierz T1","Kaletnik T1"],
 "Farmer T3 + Mielarz T2 + Kowal": ["Krawiec","Kuśnierz T1", "Kuśnierz T2", "Kaletnik T1","Kaletnik T2"],
 "Farmer T3 + Mielarz T2 + Krawiec": ["Kowal","Miecznik T1", "Miecznik T2", "Płatnerz T1","Płatnerz T2"],

 "Płatnerz T2" : ["Mielarz T3","Cieśla T3","Hutnik T3"],
 "Płatnerz T3" : ["Miecznik T5","Kuśnierz T5","Kaletnik T5","Mielarz T2","Cieśla T2","Hutnik T2","Farmer T3","Drwal T3","Górnik T3"],
 "Płatnerz T4" : ["Miecznik T4","Kuśnierz T4","Kaletnik T4","Mielarz T1","Cieśla T1","Hutnik T1","Farmer T2","Drwal T2","Górnik T2"],
 "Płatnerz T5" : ["Miecznik T3","Kuśnierz T3","Kaletnik T3"],
 "Płatnerz T5" : ["Miecznik T3","Kuśnierz T3","Kaletnik T3"],
 "Płatnerz T5 + Miecznik T1" : ["Kuśnierz T2","Kaletnik T2"],
 "Płatnerz T5 + Miecznik T2" : ["Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Płatnerz T5 + Miecznik T1 + Farmer T1" : ["Drwal T1","Górnik T1","Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Płatnerz T5 + Miecznik T1 + Drwal T1" : ["Farmer T1","Górnik T1","Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Płatnerz T5 + Miecznik T1 + Górnik T1" : ["Drwal T1","Górnik T1","Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Płatnerz T5 + Miecznik T1 + Kuśnierz T1" : ["Drwal T1","Górnik T1","Farmer T1","Kaletnik T1","Robotnik"],
 "Płatnerz T5 + Miecznik T1 + Kaletnik T1" : ["Drwal T1","Górnik T1","Farmer T1","Kuśnierz T1","Robotnik"],

 "Miecznik T2" : ["Kuśnierz T5","Kuśnierz T5","Kaletnik T5","Mielarz T3","Cieśla T3","Hutnik T3"],
 "Miecznik T3" : ["Płatnerz T5","Kuśnierz T4","Kaletnik T4","Mielarz T2","Cieśla T2","Hutnik T2","Farmer T3","Drwal T3","Górnik T3"],
 "Miecznik T4" : ["Płatnerz T4","Kuśnierz T3","Kaletnik T3","Mielarz T1","Cieśla T1","Hutnik T1","Farmer T2","Drwal T2","Górnik T2"],
 "Miecznik T5" : ["Płatnerz T3","Kuśnierz T2","Kaletnik T2"],
 "Miecznik T5 + Płatnerz T1" : ["Kuśnierz T2","Kaletnik T2"],
 "Miecznik T5 + Płatnerz T2" : ["Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Miecznik T5 + Płatnerz T1 + Farmer T1" : ["Drwal T1","Górnik T1","Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Miecznik T5 + Płatnerz T1 + Drwal T1" : ["Farmer T1","Górnik T1","Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Miecznik T5 + Płatnerz T1 + Górnik T1" : ["Drwal T1","Farmer T1","Kuśnierz T1","Kaletnik T1","Krawiec"],
 "Miecznik T5 + Płatnerz T1 + Kuśnierz T1" : ["Drwal T1","Górnik T1","Farmer T1","Kaletnik T1","Robotnik"],
 "Miecznik T5 + Płatnerz T1 + Kaletnik T1" : ["Drwal T1","Górnik T1","Farmer T1","Kuśnierz T1","Robotnik"],
};

let icons = {
    "Gołodupiec": "https://cdn.discordapp.com/avatars/472993187183591425/a_a2337b68637c7195080952341f92d3b5.gif?size=2048",

};
let notes = {
 "Gołodupiec": "Każdy jest gołodupcem",
 "Kowal": "KUJE kurwa",
 "Robotnik": "Robotnik wykonuje podstawowe prace.",
 "Krawiec": "Krawiec szyje ubrania.",
 "Farmer T1": "Nauka sadzenia i pielegnacji warzyw i zbóż",
 "Farmer T2": "Nauka sadzenia i pielegnacji owoców",
 "Farmer T3": "Nauka sadzenia i pielegnacji trudnych odmian warzyw i owoców raz ziół!",
 "Mielarz T1": "Nauka przygotowania ziarna i obsługe młynu",
 "Mielarz T2": "Nauka przygotowania chuj wie czego",
 "Mielarz T3": "Nauka przygotowania prostych przypraw"
};
function preload() {
    for (let label in icons) {
        icons[label] = loadImage(icons[label]);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    let start = new Node(0, 0, "Gołodupiec");
    nodes.push(start);
    learnedSkills.add(start.label);


    let progressNode1 = new Node(0, -400, "Inteligencja", true); 
    nodes.push(progressNode1);
    connections.push([start, progressNode1]);

    let progressNode2 = new Node(-100, -350, "Zręczność", true); 
    nodes.push(progressNode2);
    connections.push([start, progressNode2]);

    let progressNode22 = new Node(100, -350, "Siła", true); 
    nodes.push(progressNode22);
    connections.push([start, progressNode22]);

    let progressNode3 = new Node(-200, -300, "Bronie jednoręczne", true); 
    nodes.push(progressNode3);
    connections.push([start, progressNode3]);

    let progressNode33 = new Node(200, -300, "Bronie Dwuręczne", true); 
    nodes.push(progressNode33);
    connections.push([start, progressNode33]);

    let progressNode4 = new Node(-300, -250, "Łuki", true); 
    nodes.push(progressNode4);
    connections.push([start, progressNode4]);

    let progressNode44 = new Node(300, -250, "Kusze", true); 
    nodes.push(progressNode44);
    connections.push([start, progressNode44]);

    let professions = ["Kowal", "Robotnik", "Krawiec","Łowca","Karczmarz", "Uczony","Miotacz", "Stolarz", "Złodziej"];
    let offsets = [
        {x: -width / 4.5, y: height / 4},
        {x: 0, y: height / 4},
        {x: width / 4.5, y: height / 4},
        {x: -width / 2.7, y: height / 4},
        { x: width / 2.7, y: height / 4 },
        { x: -width / 1.7, y: height / 4 },
        { x: width / 1.7, y: height / 4 },
        { x: -width / 1.35, y: height / 4 },
        {x: width / 1.35, y: height / 4}
    ];

    let kowalNode, robotnikNode, krawiecNode, lowcaNode, karczmarzNode, uczonyNode, miotaczNode, stolarzNode, zlodziejNode;
    for (let i = 0; i < professions.length; i++) {
        let node = new Node(offsets[i].x, offsets[i].y, professions[i]);
        nodes.push(node);
        connections.push([start, node]);
        if (professions[i] === "Kowal") kowalNode = node;
        if (professions[i] === "Robotnik") robotnikNode = node;
        if (professions[i] === "Krawiec") krawiecNode = node;
        if (professions[i] === "Łowca") lowcaNode = node;
        if (professions[i] === "Karczmarz") karczmarzNode = node;
        if (professions[i] === "Uczony") uczonyNode = node;
        if (professions[i] === "Miotacz") miotaczNode = node;
        if (professions[i] === "Stolarz") stolarzNode = node;
        if (professions[i] === "Złodziej") zlodziejNode = node;
    }

    let jobs = ["Farmer", "Mielarz", "Drwal", "Cieśla", "Górnik", "Hutnik"];
    let jobNodes = [];
    let jobOffsetY = 150;
    let jobSpacing = 100;

    for (let i = 0; i < jobs.length; i++) {
        let node = new Node(robotnikNode.x + (i - 2.5) * jobSpacing, robotnikNode.y + jobOffsetY, jobs[i] + " T1");
        nodes.push(node);
        connections.push([robotnikNode, node]);
        jobNodes.push(node);
    }

    let tierOffsetY = 150;
    for (let job of jobNodes) {
        for (let tier = 2; tier <= 3; tier++) {
            let node = new Node(job.x, job.y + tierOffsetY, job.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([job, node]);
            job = node;
        }
    }

    let lowcaSkills = ["Myśliwy","Rybak","Garbarz"];
    let lowcaOffsetX = -250;
    let lowcaNodes = [];

    for (let i = 0; i < lowcaSkills.length; i++) {
        let node = new Node(lowcaNode.x + lowcaOffsetX, lowcaNode.y + jobOffsetY, lowcaSkills[i] + " T1");
        nodes.push(node);
        connections.push([lowcaNode, node]);
        lowcaNodes.push(node);
        lowcaOffsetX += 100;
    }

    for (let lowcaJob of lowcaNodes) {
        let maxTiers = 3; 
        if (lowcaJob.label.startsWith("Myśliwy")) {
            maxTiers = 5; 
        }
    
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(lowcaJob.x, lowcaJob.y + tierOffsetY, lowcaJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([lowcaJob, node]);
            lowcaJob = node;
        }
    }

    let karczmarzSkills = ["Gorzelnik", "Rzeźnik","Kucharz"];
    let karczmarzOffsetX = 50;
    let karczmarzNodes = [];

    for (let i = 0; i < karczmarzSkills.length; i++) {
        let node = new Node(karczmarzNode.x + karczmarzOffsetX, karczmarzNode.y + jobOffsetY, karczmarzSkills[i] + " T1");
        nodes.push(node);
        connections.push([karczmarzNode, node]);
        karczmarzNodes.push(node);
        karczmarzOffsetX += 100;
    }

    for (let karczmarzJob of karczmarzNodes) {
        let maxTiers = 3;
        if (karczmarzJob.label.startsWith("Kucharz")) {
            maxTiers = 5;
        }
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(karczmarzJob.x, karczmarzJob.y + tierOffsetY, karczmarzJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([karczmarzJob, node]);
            karczmarzJob = node;
        }
    }

    let zlodziejSkills = ["Złodziej"];
    let zlodziejOffsetX = 50;
    let zlodziejNodes = [];
    
    for (let i = 0; i < zlodziejSkills.length; i++) {
        let node = new Node(zlodziejNode.x + zlodziejOffsetX, zlodziejNode.y + jobOffsetY, zlodziejSkills[i] + " T1");
        nodes.push(node);
        connections.push([zlodziejNode, node]);
        zlodziejNodes.push(node);
        zlodziejOffsetX += 100;
    }
    
    for (let zlodziejJob of zlodziejNodes) {
        let maxTiers = 3;
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(zlodziejJob.x, zlodziejJob.y + tierOffsetY, zlodziejJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([zlodziejJob, node]);
            zlodziejJob = node;
        }
    }

    let kowalSkills = ["Miecznik", "Płatnerz"];
    let kowalOffsetX = -150;
    let kowalNodes = [];

    for (let i = 0; i < kowalSkills.length; i++) {
        let node = new Node(kowalNode.x + kowalOffsetX, kowalNode.y + jobOffsetY, kowalSkills[i] + " T1");
        nodes.push(node);
        connections.push([kowalNode, node]);
        kowalNodes.push(node);
        kowalOffsetX += 100;
    }

    for (let kowalJob of kowalNodes) {
        for (let tier = 2; tier <= 5; tier++) {
            let node = new Node(kowalJob.x, kowalJob.y + tierOffsetY, kowalJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([kowalJob, node]);
            kowalJob = node;
        }
    }

    let stolarzSkills = ["Stolarz"];
    let stolarzOffsetX = -50;
    let stolarzNodes = [];
    
    for (let i = 0; i < stolarzSkills.length; i++) {
        let node = new Node(stolarzNode.x + stolarzOffsetX, stolarzNode.y + jobOffsetY, stolarzSkills[i] + " T1");
        nodes.push(node);
        connections.push([stolarzNode, node]);
        stolarzNodes.push(node);
        stolarzOffsetX += 100;
    }
    
    for (let stolarzJob of stolarzNodes) {
        let maxTiers = 4;
        for (let tier = 2; tier <= maxTiers; tier++) {
            let node = new Node(stolarzJob.x, stolarzJob.y + tierOffsetY, stolarzJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([stolarzJob, node]);
            stolarzJob = node;
        }
    }

    let krawiecSkills = ["Kuśnierz", "Kaletnik"];
    let krawiecOffsetX = 50;
    let krawiecNodes = [];

    for (let i = 0; i < krawiecSkills.length; i++) {
        let node = new Node(krawiecNode.x + krawiecOffsetX, krawiecNode.y + jobOffsetY, krawiecSkills[i] + " T1");
        nodes.push(node);
        connections.push([krawiecNode, node]);
        krawiecNodes.push(node);
        krawiecOffsetX += 100;
    }

    for (let krawiecJob of krawiecNodes) {
        for (let tier = 2; tier <= 5; tier++) {
            let node = new Node(krawiecJob.x, krawiecJob.y + tierOffsetY, krawiecJob.label.split(" ")[0] + " T" + tier);
            nodes.push(node);
            connections.push([krawiecJob, node]);
            krawiecJob = node;
        }
    }

    let uczonySkills = ["Alchemnik", "Cyrulik",];
let uczonyOffsetX = -150;
let uczonyNodes = [];

for (let i = 0; i < uczonySkills.length; i++) {
    let node = new Node(uczonyNode.x + uczonyOffsetX, uczonyNode.y + jobOffsetY, uczonySkills[i] + " T1");
    nodes.push(node);
    connections.push([uczonyNode, node]);
    uczonyNodes.push(node);
    uczonyOffsetX += 100;
}

for (let uczonyJob of uczonyNodes) {
    let maxTiers = 3;
    if (uczonyJob.label.startsWith("Alchemik")) {
        maxTiers = 4;
    }
    for (let tier = 2; tier <= maxTiers; tier++) {
        let node = new Node(uczonyJob.x, uczonyJob.y + tierOffsetY, uczonyJob.label.split(" ")[0] + " T" + tier);
        nodes.push(node);
        connections.push([uczonyJob, node]);
        uczonyJob = node;
    }
    }
    
    let miotaczSkills = ["Łuczarz", "Kusznikarz",];
let miotaczOffsetX = 50;
let miotaczNodes = [];

for (let i = 0; i < miotaczSkills.length; i++) {
    let node = new Node(miotaczNode.x + miotaczOffsetX, miotaczNode.y + jobOffsetY, miotaczSkills[i] + " T1");
    nodes.push(node);
    connections.push([miotaczNode, node]);
    miotaczNodes.push(node);
    miotaczOffsetX += 100;
}

for (let miotaczJob of miotaczNodes) {
    let maxTiers = 4;
    for (let tier = 2; tier <= maxTiers; tier++) {
        let node = new Node(miotaczJob.x, miotaczJob.y + tierOffsetY, miotaczJob.label.split(" ")[0] + " T" + tier);
        nodes.push(node);
        connections.push([miotaczJob, node]);
        miotaczJob = node;
    }
}
}

function draw() {
    background(20);
    translate(width / 2 + offsetX, height / 2 + offsetY);
    scale(zoomLevel);
    stroke(200);

    for (let conn of connections) {
        let opacity = 255;
        if (isSkillBlocked(conn[0].label) || isSkillBlocked(conn[1].label)) {
            opacity = 50;
        }
        strokeWeight(1);
        stroke(200, opacity);
        line(conn[0].x, conn[0].y, conn[1].x, conn[1].y);
    }

    for (let node of nodes) {
        let opacity = 255;
        if (isSkillBlocked(node.label)) {
            opacity = 50;
        }

        if (node.isProgressNode) {
            fill(node.isActive ? 'red' : `rgba(173, 216, 230, ${opacity / 255})`);
            stroke(node.isActive ? 255 : 255);
            strokeWeight(node.isActive ? 3 : 1);
            ellipse(node.x, node.y, 60); 

            let radius = 30; 
            let startAngle = -HALF_PI; 
            let endAngle = startAngle + TWO_PI * (node.progress / 100); 

            noFill();
            stroke(100, 100, 100, opacity);
            strokeWeight(6); 
            arc(node.x, node.y, radius * 2, radius * 2, 0, TWO_PI);

            stroke(0, 255, 0, opacity);
            strokeWeight(6); 
            arc(node.x, node.y, radius * 2, radius * 2, startAngle, endAngle);

            fill(255, opacity);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            text(`${node.progress}%`, node.x, node.y);

            fill(255, opacity);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            text(node.label, node.x, node.y - 40); 
        } else {
            fill(node.isActive ? 'red' : `rgba(173, 216, 230, ${opacity / 255})`);
            stroke(node.isActive ? 255 : 255);
            strokeWeight(node.isActive ? 3 : 1);
            ellipse(node.x, node.y, 40);

            if (icons[node.label]) {
                let iconOpacity = isSkillBlocked(node.label) ? 50 : 255;

                drawingContext.save();
                drawingContext.beginPath();
                drawingContext.arc(node.x, node.y, 15, 0, TWO_PI);
                drawingContext.clip();

                imageMode(CENTER);
                tint(255, iconOpacity);
                image(icons[node.label], node.x, node.y, 50, 50);
                noTint();

                drawingContext.restore();
            }

            fill(255, opacity);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(12);
            text(node.label, node.x, node.y - 30);
        }

        if (isSkillBlocked(node.label)) {
            stroke(255, 0, 0);
            strokeWeight(3);
            line(node.x - 20, node.y - 20, node.x + 20, node.y + 20);
            line(node.x - 20, node.y + 20, node.x + 20, node.y - 20);
        }
    }
}

function mousePressed() {
    if (isModalOpen) return;

    let adjustedMouseX = (mouseX - width / 2 - offsetX) / zoomLevel;
    let adjustedMouseY = (mouseY - height / 2 - offsetY) / zoomLevel;

    if (mouseButton === RIGHT) {
        isDragging = true;
        lastX = mouseX;
        lastY = mouseY;

        for (let node of nodes) {
            let d = dist(adjustedMouseX, adjustedMouseY, node.x, node.y);
            if (d < 20) {
                draggedNode = node; 
                break;
            }
        }
    }

    if (mouseButton === LEFT) {
        for (let node of nodes) {
            let d = dist(adjustedMouseX, adjustedMouseY, node.x, node.y);
            if (d < 20) {
                handleLearning(node);
                break;
            }
        }
    }
}

function mouseReleased() {
    if (mouseButton === RIGHT) {
        isDragging = false;
    }
}

function mouseDragged() {
    if (isModalOpen) return;

    if (isDragging) {
        let dx = mouseX - lastX;
        let dy = mouseY - lastY;

        for (let node of nodes) {
            node.x += dx;
            node.y += dy;
        }

        lastX = mouseX;
        lastY = mouseY;
    }
}

function mouseMoved() {
clearTimeout(tooltipTimeout);
const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
    
    let adjustedMouseX = (mouseX - width / 2 - offsetX) / zoomLevel;
    let adjustedMouseY = (mouseY - height / 2 - offsetY) / zoomLevel;
    
for (let node of nodes) {
let d = dist(mouseX - offsetX, mouseY - offsetY, node.x + width / 2, node.y + height / 2);
if (d < 20) {
    tooltipTimeout = setTimeout(() => {
        tooltip.textContent = notes[node.label] || "Brak notatki dla tej umiejętności.";
        tooltip.style.left = `${mouseX + 10}px`;
        tooltip.style.top = `${mouseY + 10}px`;
        tooltip.style.display = 'block';
    }, 1000);
    break;
}
}
}

function mouseOut() {
clearTimeout(tooltipTimeout);
const tooltip = document.getElementById('tooltip');
tooltip.style.display = 'none';
}

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

function mouseWheel(event) {
    event.preventDefault();

    if (event.deltaY < 0) {
        zoomLevel += zoomFactor;
    } else {
        zoomLevel -= zoomFactor;
    }

    zoomLevel = Math.min(Math.max(zoomLevel, 0.5), 3);
}

window.addEventListener('wheel', mouseWheel, { passive: false });

function handleLearning(node) {
    if (node.isProgressNode) {
        node.progress += 10; 
        if (node.progress >= 100) {
            node.progress = 100; 
            node.isActive = true;
        }
        return;
    }

    if (learnedSkills.has(node.label)) {
        return;
    }

    if (isSkillBlocked(node.label)) {
        showMessage("Nie możesz nauczyć się tej umiejętności, ponieważ została zablokowana.");
        return;
    }

    let parent = getParent(node);
    if (parent && !learnedSkills.has(parent.label)) {
        showMessage("Nie możesz nauczyć się tej umiejętności, ponieważ nie nauczyłeś się poprzedniej.");
        return;
    }

    showConfirmation(node);
}

function isSkillBlocked(skill) {
    for (let learnedSkill of learnedSkills) {
        if (skillBlocks[learnedSkill] && skillBlocks[learnedSkill].includes(skill)) {
            return blockedSkills.has(skill);
        }
    }

    for (let condition in skillBlocks) {
        if (condition.includes("+")) {
            let requiredSkills = condition.split(" + ");
            let allSkillsLearned = requiredSkills.every(skill => learnedSkills.has(skill));
            if (allSkillsLearned && skillBlocks[condition].includes(skill)) {
                return blockedSkills.has(skill);
            }
        }
    }

    return false;
}

function getParent(node) {
    for (let conn of connections) {
        if (conn[1] === node) {
            return conn[0];
        }
    }
    return null;
}

function showMessage(message) {
    const confirmationDiv = document.getElementById('confirmation');
    document.getElementById('confirmationText').textContent = message;
    confirmationDiv.style.display = 'block';
    document.getElementById('continue').style.display = 'none';
    document.getElementById('cancel').textContent = "OK";

    isModalOpen = true;

    document.getElementById('cancel').onclick = function() {
        confirmationDiv.style.display = 'none';
        document.getElementById('continue').style.display = 'inline-block';
        isModalOpen = false;
    };
}

function showConfirmation(node) {
    const confirmationDiv = document.getElementById('confirmation');
    document.getElementById('confirmationText').textContent =
        "Nauka tej dziedziny może zablokować dostęp do innych lub mocno ograniczyć ich rozwój. Czy na pewno chcesz kontynuować?";
    confirmationDiv.style.display = 'block';

    isModalOpen = true;

    document.getElementById('continue').style.display = 'inline-block';
    document.getElementById('cancel').textContent = "Anuluj";

    document.getElementById('continue').onclick = function() {
        learnSkill(node);
        confirmationDiv.style.display = 'none';
        isModalOpen = false;
    };

    document.getElementById('cancel').onclick = function() {
        confirmationDiv.style.display = 'none';
        isModalOpen = false;
    };
}

function learnSkill(node) {
learnedSkills.add(node.label);
history.push(node.label);

if (skillBlocks[node.label]) {
for (let blockedSkill of skillBlocks[node.label]) {
    blockedSkills.add(blockedSkill);
}
}

for (let condition in skillBlocks) {
if (condition.includes("+")) {
    let requiredSkills = condition.split(" + ");
    let allSkillsLearned = requiredSkills.every(skill => learnedSkills.has(skill));
    if (allSkillsLearned) {
        for (let blockedSkill of skillBlocks[condition]) {
            blockedSkills.add(blockedSkill);
        }
    }
}
}

for (let conn of connections) {
if (conn[1] === node) {
    activeConnections.push(conn);
}
}
node.isActive = true;
}

function undo() {
if (history.length === 0) return; 

let lastSkill = history.pop(); 
learnedSkills.delete(lastSkill); 

if (skillBlocks[lastSkill]) {
for (let blockedSkill of skillBlocks[lastSkill]) {
    blockedSkills.delete(blockedSkill);
}
}

for (let condition in skillBlocks) {
if (condition.includes("+")) {
    let requiredSkills = condition.split(" + ");
    let allSkillsLearned = requiredSkills.every(skill => learnedSkills.has(skill));
    if (!allSkillsLearned) {
        for (let blockedSkill of skillBlocks[condition]) {
            blockedSkills.delete(blockedSkill);
        }
    }
}
}

for (let node of nodes) {
if (node.label === lastSkill) {
    node.isActive = false;
    break;
}
}
}

function reset() {
learnedSkills.clear(); 
blockedSkills.clear(); 
history = []; 

for (let node of nodes) {
node.isActive = node.label === "Gołodupiec"; 
}
}

document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('resetButton').addEventListener('click', reset);

class Node {
    constructor(x, y, label, isProgressNode = false) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.isActive = label === "Gołodupiec";
        this.isProgressNode = isProgressNode; 
        this.progress = 0;
    }
}

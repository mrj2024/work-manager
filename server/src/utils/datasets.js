export const paceCodes = [
  { letter: 'A', title: 'PACE Code A', summary: 'Stop and search powers for persons and vehicles', keyPoints: ['Requires reasonable suspicion', 'Record keeping obligations', 'Specific grounds'] },
  { letter: 'B', title: 'PACE Code B', summary: 'Searching premises and seizing property', keyPoints: ['Search warrants', 'Entry procedures', 'Seizure documentation'] },
  { letter: 'C', title: 'PACE Code C', summary: 'Detention, treatment and questioning', keyPoints: ['Custody officer duties', 'Detainee rights', 'Interview safeguards'] },
  { letter: 'D', title: 'PACE Code D', summary: 'Identification of persons', keyPoints: ['Video identification', 'Group identification', 'Fingerprints and photographs'] },
  { letter: 'E', title: 'PACE Code E', summary: 'Audio recording of interviews', keyPoints: ['Recording standards', 'Sealing master recordings', 'Transcription guidance'] },
  { letter: 'F', title: 'PACE Code F', summary: 'Visual recording of interviews', keyPoints: ['Camera positioning', 'Digital storage', 'Disclosure processes'] },
  { letter: 'G', title: 'PACE Code G', summary: 'Statutory power of arrest', keyPoints: ['Necessity criteria', 'Information to suspect', 'Documentation'] },
  { letter: 'H', title: 'PACE Code H', summary: 'Detention of terrorism suspects', keyPoints: ['Extended detention', 'Special review procedures', 'Access to legal advice'] }
];

export const crimeClassification = [
  { offence: 'Theft from shop', classification: 'Either-way', notes: 'Value dependent and circumstances' },
  { offence: 'Common assault', classification: 'Summary', notes: 'No injury or minor injury' },
  { offence: 'Burglary dwelling', classification: 'Either-way', notes: 'Serious cases sent to Crown Court' },
  { offence: 'Murder', classification: 'Indictable', notes: 'Only triable on indictment' },
  { offence: 'Criminal damage under £5,000', classification: 'Summary', notes: 'Unless opted for Crown Court' },
  { offence: 'Possession with intent to supply Class A', classification: 'Indictable', notes: 'Serious drug offence' }
];

export const legislationIndex = [
  { act: 'Police and Criminal Evidence Act 1984', summary: 'Framework for police powers and safeguards', keySections: ['s1 Stop & Search', 's17 Entry', 's24 Arrest'], purpose: 'Balance powers with civil liberties' },
  { act: 'Criminal Justice Act 2003', summary: 'Sentencing, evidence and criminal procedure reforms', keySections: ['s142 Sentencing purposes', 'Part 12 Sentencing'], purpose: 'Modernise justice system' },
  { act: 'Human Rights Act 1998', summary: 'Incorporates ECHR into UK law', keySections: ['Article 2 Life', 'Article 8 Privacy'], purpose: 'Ensure public authorities respect rights' },
  { act: 'Crime and Disorder Act 1998', summary: 'Youth justice and ASBO framework', keySections: ['s1 Anti-social behaviour orders'], purpose: 'Tackle crime and disorder' },
  { act: 'Misuse of Drugs Act 1971', summary: 'Controls production and supply of drugs', keySections: ['s4 Production', 's5 Possession'], purpose: 'Prevent drug misuse' }
];

export const ndmStages = [
  { id: 1, title: 'Code of Ethics', description: 'Values underpinning all decisions' },
  { id: 2, title: 'Gather Information & Intelligence', description: 'Establish facts, law, policy' },
  { id: 3, title: 'Assess Threat & Risk', description: 'Identify harm, consider powers and policies' },
  { id: 4, title: 'Consider Powers & Policy', description: 'Review legislation, guidance' },
  { id: 5, title: 'Identify Options & Contingencies', description: 'Generate proportionate responses' },
  { id: 6, title: 'Take Action & Review', description: 'Implement plan and record rationale' }
];

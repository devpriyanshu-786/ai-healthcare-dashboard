export function mockAnalyze(symptoms: string[]) {
  const lower = symptoms.join(' ').toLowerCase()
  if (lower.includes('fever') && lower.includes('cough')) {
    return {
      prediction: 'Common cold / viral infection (demo only)',
      confidence: 78,
      keySymptoms: symptoms,
      otherConditions: [{ name: 'Influenza (demo possibility)', prob: 12 }, { name: 'Seasonal allergy (demo possibility)', prob: 8 }],
      recommendations: ['Discuss symptoms with a qualified healthcare professional', 'Monitor symptoms and seek urgent care if symptoms are severe or worsening'],
      disclaimer: 'Mock output only. Not a diagnosis or treatment recommendation.'
    }
  }
  return {
    prediction: 'General symptom review (demo only)',
    confidence: 64,
    keySymptoms: symptoms,
    otherConditions: [{ name: 'Other causes need professional review', prob: 10 }],
    recommendations: ['Consult a qualified healthcare professional for assessment', 'Seek urgent care for severe or rapidly worsening symptoms'],
    disclaimer: 'Mock output only. Not a diagnosis or treatment recommendation.'
  }
}

import EvidenceEntry from '../models/EvidenceEntry.js';
import { paceCodes, crimeClassification, legislationIndex, ndmStages } from '../utils/datasets.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPaceCodes = asyncHandler(async (req, res) => {
  const { letter, search } = req.query;
  let data = paceCodes;
  if (letter) {
    data = data.filter((item) => item.letter.toLowerCase() === letter.toLowerCase());
  }
  if (search) {
    const term = search.toLowerCase();
    data = data.filter((item) => item.summary.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
  }
  res.json(data);
});

export const getCrimeClassification = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let data = crimeClassification;
  if (search) {
    const term = search.toLowerCase();
    data = data.filter((item) => item.offence.toLowerCase().includes(term));
  }
  res.json(data);
});

export const getLegislation = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let data = legislationIndex;
  if (search) {
    const term = search.toLowerCase();
    data = data.filter((item) => item.act.toLowerCase().includes(term) || item.summary.toLowerCase().includes(term));
  }
  res.json(data);
});

export const getNDM = asyncHandler(async (req, res) => {
  res.json(ndmStages);
});

export const getEvidenceEntries = asyncHandler(async (req, res) => {
  const log = await EvidenceEntry.findOne({ user: req.user.id });
  res.json(log ?? { user: req.user.id, entries: [] });
});

export const saveEvidenceEntry = asyncHandler(async (req, res) => {
  const update = await EvidenceEntry.findOneAndUpdate(
    { user: req.user.id },
    { $push: { entries: req.body } },
    { new: true, upsert: true }
  );
  res.status(201).json(update);
});

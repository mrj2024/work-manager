import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { Document as DocxDocument, Packer, Paragraph } from 'docx';
import DocumentModel from '../models/Document.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sanitizeRichText } from '../utils/sanitize.js';

const uploadsDir = path.resolve(process.cwd(), 'server', 'uploads');

export const listDocuments = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user.id };
  const documents = await DocumentModel.find(filter).sort({ updatedAt: -1 });
  res.json(documents);
});

export const createDocument = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const sanitized = sanitizeRichText(content);
  const document = await DocumentModel.create({
    title,
    content: sanitized,
    user: req.user.id,
    versions: [{ content: sanitized }]
  });
  res.status(201).json(document);
});

export const getDocument = asyncHandler(async (req, res) => {
  const document = await DocumentModel.findById(req.params.id);
  if (!document) return res.status(404).json({ message: 'Document not found' });
  if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.json(document);
});

export const updateDocument = asyncHandler(async (req, res) => {
  const document = await DocumentModel.findById(req.params.id);
  if (!document) return res.status(404).json({ message: 'Not found' });
  if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const sanitized = sanitizeRichText(req.body.content);
  document.title = req.body.title || document.title;
  document.content = sanitized;
  document.status = req.body.status || document.status;
  document.versions.push({ content: sanitized });
  await document.save();
  res.json(document);
});

export const deleteDocument = asyncHandler(async (req, res) => {
  const document = await DocumentModel.findById(req.params.id);
  if (!document) return res.status(404).json({ message: 'Not found' });
  if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  await document.deleteOne();
  res.json({ message: 'Document deleted' });
});

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File required' });
  const document = await DocumentModel.create({
    title: req.file.originalname,
    content: '',
    user: req.user.id,
    fileKey: req.file.filename,
    originalName: req.file.originalname
  });
  res.status(201).json(document);
});

const htmlToPlainText = (html = '') => html.replace(/<[^>]*>?/gm, '');

export const exportDocument = asyncHandler(async (req, res) => {
  const { format } = req.query;
  const document = await DocumentModel.findById(req.params.id);
  if (!document) return res.status(404).json({ message: 'Not found' });
  if (document.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  const plain = htmlToPlainText(document.content);
  if (format === 'pdf') {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=\"${document.title}.pdf\"`);
    const doc = new PDFDocument();
    doc.pipe(res);
    doc.fontSize(16).text(document.title, { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(plain || 'No content');
    doc.end();
    return;
  }
  if (format === 'docx') {
    const doc = new DocxDocument({
      sections: [{ properties: {}, children: [new Paragraph(document.title), new Paragraph(plain)] }]
    });
    const buffer = await Packer.toBuffer(doc);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename=\"${document.title}.docx\"`);
    return res.send(buffer);
  }
  const markdown = plain || `# ${document.title}\nNo content available.`;
  res.setHeader('Content-Type', 'text/markdown');
  res.setHeader('Content-Disposition', `attachment; filename=\"${document.title}.md\"`);
  res.send(markdown);
});

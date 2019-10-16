import { Document, Packer, Paragraph, TextRun } from 'node_modules/docx';

export class ReportGenerator {
	public create(data) {
		const document = new Document();

		const items: any[] = [];
		data.forEach(item => {
			items.push(new Paragraph(item.title));
			items.push(new Paragraph(item.content));
		});

		document.addSection({
			children: items
		});

		return document;
	}

	private makeHeading(text) {
		// return new Paragraph(text).heading3();
	}

	private makeParagraph(text) {
		// return new Paragraph(text).spacing({ before = 0, after = 10, line = 0 });
	}
}

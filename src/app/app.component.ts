import { Component } from '@angular/core';
import * as html2pdf from 'node_modules/html2pdf.js';
import { Document, Packer } from 'node_modules/docx';
import { saveAs } from 'file-saver/dist/FileSaver';
import { ReportGenerator } from './report-generator';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title = 'HTML2PDF Experiment';
	public window = window;

	public data: any[] = [
		{
			title: 'Russian Blue',
			content:
				'Headbutt owner\'s knee bleghbleghvomit my <a href="http://google.com" class="item__link">furball</a> really tie the room together and poop in litter box, scratch the walls cat ass trophy push your water glass on the floor so cats making all the muffins munch on tasty moths.'
		},
		{
			title: 'Ragdoll',
			content:
				'Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans.'
		},
		{
			title: 'Persian',
			content:
				'Find a way to fit in tiny box pushes butt to face so i bet my nine lives on you-oooo-ooo-hooo so sleep in the bathroom sink.'
		},
		{
			title: 'Siamese',
			content:
				'Twitch tail in permanent irritation find empty spot in cupboard and sleep all day and rub butt on table so i want to go outside let me go outside nevermind inside is better.'
		},
		{
			title: 'Bengal',
			content:
				'Grab pompom in mouth and put in water dish find box a little too small and curl up with fur hanging out and i just saw other cats inside the house and nobody ask me before using my litter box and head nudges.'
		},
		{
			title: 'Tabby',
			content: 'Milk the cow when in doubt, wash.'
		},
		{
			title: 'Void',
			content:
				'White cat sleeps on a black shirt look at dog hiiiiiisssss side-eyes your "jerk" other hand while being petted for get scared by sudden appearance of cucumber eat from dog\'s food why must they do that your pillow is now my pet bed.'
		},
		{
			title: 'Cornish Rex',
			content:
				'Demand to have some of whatever the human is cooking, then sniff the offering and walk away somehow manage to catch a bird but have no idea what to do next, so play with it until it dies of shock, yet if it fits, i sits.'
		},
		{
			title: 'Sphynx',
			content: 'Paw at beetle and eat it before it gets away.'
		}
	];

	// pdf styles
	private date = new Date();
	private options: any = {
		filename: 'Report Export ' + this.date.getDate() + '-' + this.date.getMonth() + '-' + this.date.getFullYear(),
		enableLinks: true,
		margin: [10, 10, 20, 10],
		pagebreak: { mode: 'css' },
		html2canvas: {
			letterRendering: true
		}
	};

	public pdfify(element) {
		html2pdf()
			.set(this.options)
			.from(element)
			.toPdf()
			.get('pdf')
			.then(pdf => {
				const totalPages = pdf.internal.getNumberOfPages();

				for (let i = 1; i <= totalPages; i++) {
					pdf.setPage(i);
					pdf.setFontSize(10);
					pdf.setTextColor(150);
					pdf.text(
						'Page ' + i + ' of ' + totalPages,
						pdf.internal.pageSize.getWidth() - 115,
						pdf.internal.pageSize.getHeight() - 10
					);
				}
			})
			.save();
	}

	// doc
	public docxit() {
		const reportGenerator = new ReportGenerator();
		const doc = reportGenerator.create(this.data);

		Packer.toBlob(doc).then(blob => {
			saveAs(blob, 'Report Export ' + this.date.getDate() + '-' + this.date.getMonth() + '-' + this.date.getFullYear() + 'docx');
		});
	}
}

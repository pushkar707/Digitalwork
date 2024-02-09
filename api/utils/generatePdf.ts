const puppeteer = require('puppeteer');

export const generatePDF = async (user:any) => {    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Set the HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PDF from HTML</title>
        </head>
        <body>
            <main style="width: 100%; max-width: 100vw; position: fixed; top: 0; left: 0; padding: 5vh 0; height: 100%; background-color: rgba(0, 0, 0, 0.4); z-index: 10;">
                <div style="position: relative; height: 90vh; max-width: 90vw; overflow-y: scroll; scroll-behavior: auto; margin: auto; padding: 8px; padding-top: 5px; border: 1px solid #CBD5E0; background-color: #7B8794; border-radius: 12px; color: #000;">
                    <p style="text-align: center; font-weight: 500; font-size: 17px; margin-bottom: 4px;">Learner's License</p>
            
                    <hr style="height: 0.5px; background-color: #475569; margin-bottom: 5px;" />            
                    <div style="display: flex; flex-direction: column; gap: 2px; margin-bottom: 5px; position: relative;">
                        <img src="https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${user.profileImageKey}" style="position:absolute; top:10px; right:10px" width="100px">
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Name:</p>${user.name}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Mobile Number:</p>${user.mobileNumber}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Aadhar Number:</p>${user.aadharnumber}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Date of Birth:</p>${user.dob}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">State:</p>${user.state}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Category:</p>${user.category}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Blood Group:</p>${user.bloodGroup}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Gender:</p>${user.gender}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Address:</p>${user.addressLine1}, ${user.addressLine2}, ${user.pincode}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">License Categories:</p>${user.licenseCategories.map((item:any) => `<span>${item}</span>`).join('')}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Commerical Use:</p>${user.isCommercialLicense ? 'Yes' : 'No'}</div>
                        <div style="display: flex; gap: 1px;"><p style="font-weight: 600; width: 32%; max-width: 40%; min-width: 52px;">Donating Organs:</p>${user.isDonatingOrgans ? 'Yes' : 'No'}</div>
                    </div>
                </div>
            </main>
    
        </body>
      </html>
    `;
  
    // Navigate to a data URL with the HTML content
    await page.goto(`data:text/html,${encodeURIComponent(htmlContent)}`, { waitUntil: 'domcontentloaded' });
  
    // Generate PDF from the HTML content
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await require('fs').promises.writeFile('output.pdf', pdfBuffer);
  
    await browser.close();
    return pdfBuffer
  };
  

// generatePDF()
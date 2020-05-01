const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          <!-- Content here -->
        </ul>
      </div>
    `;

    it("should return no <li>s for no categories", () => {
      //Arrange
      const catagories = [];

      //Act
      const result = mergeCategories(template, catagories, 'li');

      //Assert
      expect(result).to.have.string('<div>');
      expect(result).to.have.string("</div>");
      expect(result).to.have.string("<ul>");
      expect(result).to.have.string("</ul>");
      expect(result).to.not.have.string("<li>");
      expect(result).to.not.have.string("</li>");
    });

    it("should return a single <li> for one category", () => {
      //Arrange
      const catagories = ['testing-testing-1-2-3'];

      //Act
      const result = mergeCategories(template, catagories, 'li');

      //Assert
      expect(result).to.have.string('<div>');
      expect(result).to.have.string('</div>');
      expect(result).to.have.string('<ul>');
      expect(result).to.have.string('</ul>');
      expect(result).to.have.string(`<li>${catagories}</li>`);
      expect(result).to.not.have.string('<!-- Content here -->');
    });

    it("should return an <li> for each category", () => {
      //Arrange
      const catagories = ['testes', 'testies', 'testings', 'tests-Ez'];

      //Act
      const result = mergeCategories(template, catagories, 'li');

      //Assert
      expect(result).to.have.string('<div>');
      expect(result).to.have.string('</div>');
      expect(result).to.have.string('<ul>');
      expect(result).to.have.string('</ul>');
      expect(result).to.have.string(`<li>${catagories[0]}</li>`);
      expect(result).to.have.string(`<li>${catagories[1]}</li>`);
      expect(result).to.have.string(`<li>${catagories[2]}</li>`);
      expect(result).to.have.string(`<li>${catagories[3]}</li>`);
      expect(result).to.not.have.string('<!-- Content here -->');
    });
  });


  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          <!-- Content here -->
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      //Arrange
      const catagories = [];

      //Act
      const result = mergeCategories(template, catagories, 'options');

      //Assert
      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<select>');
      expect(result).to.include('</select>');
      expect(result).to.not.include('<options>');
      expect(result).to.not.include('</options>');
    });

    it("should return a single <option> for one category", () => {
      //Arrange
      const catagories = ['a stringy poo, a stinky poo...'];

      //Act
      const result = mergeCategories(template, catagories, 'options');

      //Assert
      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<select>');
      expect(result).to.include('</select>');
      expect(result).to.include(`<options>${catagories}</options>`);
      expect(result).to.not.include('<!-- Content here -->');
    });

    it("should return an <option> for each category", () => {
      //Arrange
      const catagories = ['turkey', 'spurkey', 'jerkey', 'hellurkey'];

      //Act
      const result = mergeCategories(template, catagories, 'options');

      //Assert
      expect(result).to.include('<div>');
      expect(result).to.include('</div>');
      expect(result).to.include('<select>');
      expect(result).to.include('</select>');
      expect(result).to.include(`<options>${catagories[0]}</options>`);
      expect(result).to.include(`<options>${catagories[1]}</options>`);
      expect(result).to.include(`<options>${catagories[2]}</options>`);
      expect(result).to.include(`<options>${catagories[3]}</options>`);
      expect(result).to.not.include('<!-- Content here -->');
    });
  });
});

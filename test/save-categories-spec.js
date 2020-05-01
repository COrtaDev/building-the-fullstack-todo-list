const { expect } = require('chai');
const { saveCategories } = require('../save-categories');
describe("saveCategories()", () => {
  it('adds the new category to the list', () => {
    // Arrange
    const categories = ['One', 'Two', 'Three'];
    const newCategory = 'New Category';

    // Act
    const result = saveCategories(categories, newCategory);

    // Assert
    expect(result).to.include('New Category');
  });

  it('sorts the list', () => {
    // Arrange
    const categories = ['Cat 3', 'Cat 1'];
    const newCategory = 'Cat 2';

    // Act
    const result = saveCategories(categories, newCategory);

    // Assert
    expect(result).to.eql(['Cat 1', 'Cat 2', 'Cat 3']);
  });

  it('makes sure the result and the original are different', () => {
    // Arrange
    const categories = ['Spaghet', 'Meatball', 'Gabbagoo'];
    const newCategory = 'Pammajohn';

    // Act
    const result = saveCategories(categories, newCategory);

    // Assert
    expect(result).to.not.equal(categories);
  });
});

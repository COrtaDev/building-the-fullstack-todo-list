const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
    <table>
      <tbody>
        <!-- Content here -->
      </tbody>
    </table>
  `;
  it("should return no <tr>s and no <td>s for no items", () => {
    //Arrange
    const items = [];

    //Act
    const result = mergeItems(template, items)

    //Assert
    expect(result).to.have.string('<table>');
    expect(result).to.have.string('</table>');
    expect(result).to.have.string('<tbody>');
    expect(result).to.have.string('</tbody>');
    expect(result).to.not.have.string('<tr>');
    expect(result).to.not.have.string('</tr>');
    expect(result).to.not.have.string('<td>');
    expect(result).to.not.have.string('</td>');
    expect(result).to.not.have.string('<!-- Content here -->');
  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    //Arrange
    const items = [
      { title: 'Title 1', category: 'Cat 1' },
    ];

    //Act
    const result = mergeItems(template, items);
    // console.log(result);
    //Assert
    expect(result).to.have.string('<table>');
    expect(result).to.have.string('</table>');
    expect(result).to.have.string('<tbody>');
    expect(result).to.have.string('</tbody>');
    expect(result).to.have.string('<tr>');
    expect(result).to.have.string('</tr>');
    expect(result).to.have.string(`<td>Title 1</td>`);
    expect(result).to.have.string(`<td>Cat 1</td>`);
    expect(result).to.have.string('<form method="POST" action="/items/1">');
    expect(result).to.not.have.string('<!-- Content here -->');
  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    const items = [
      { title: 'Title 1', category: 'Cat 1', isComplete: true },
    ];

    const result = mergeItems(template, items);
    // console.log(result);

    expect(result).to.have.string('<table>');
    expect(result).to.have.string('</table>');
    expect(result).to.have.string('<tbody>');
    expect(result).to.have.string('</tbody>');
    expect(result).to.have.string('<tr>');
    expect(result).to.have.string('</tr>');
    expect(result).to.have.string(`<td>Title 1</td>`);
    expect(result).to.have.string(`<td>Cat 1</td>`);
    expect(result).to.not.have.string('<form method="POST" action="/items/1">');
    expect(result).to.not.have.string('<!-- Content here -->');
  });

  it("should return three <tr>s for three items", () => {
    //Arrange
    const items = [
      { title: 'Title 1', category: 'Cat 1', isComplete: true },
      { title: 'Title 2', category: 'Cat 2', isComplete: true },
      { title: 'Title 3', category: 'Cat 3' }
    ];

    //Act
    const result = mergeItems(template, items);
    // console.log(result);

    //Assert
    expect(result).to.have.string('<table>');
    expect(result).to.have.string('</table>');
    expect(result).to.have.string('<tbody>');
    expect(result).to.have.string('</tbody>');
    expect(result).to.have.string('<td>1</td>');
    expect(result).to.have.string('<td>Title 1</td>');
    expect(result).to.have.string('<td>Cat 1</td>');
    expect(result).to.have.string('<td>2</td>');
    expect(result).to.have.string('<td>Title 2</td>');
    expect(result).to.have.string('<td>Cat 2</td>');
    expect(result).to.have.string('<td></td>');
    expect(result).to.have.string('<td>3</td>');
    expect(result).to.have.string('<td>Title 3</td>');
    expect(result).to.have.string('<td>Cat 3</td>');
    expect(result).to.have.string('<form method="POST" action="/items/3">');
    expect(result).to.not.have.string('<form method="POST" action="/items/1">');
    expect(result).to.not.have.string('<form method="POST" action="/items/2">');
    expect(result).to.not.have.string('<!-- Content here -->');
  });
});

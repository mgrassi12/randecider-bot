import { expect } from 'chai';
import { randomlySelectAnOption } from './utils';

describe('randomlySelectAnOption(options)', function() {
    it('should randomly select an option', function(){
        options = ['burgers','sushi','tacos'];
        selectedOption = randomlySelectAnOption(options);
        expect(selectedOption).to.contain(option[0] || option[1] || option[2]);
    });
});

//TODO write tests
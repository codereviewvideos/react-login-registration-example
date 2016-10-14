import errorHelper from '../../src/helpers/formErrorHelper';

describe('Symfony Form Error Helper', () => {

  it('handles empty objects', () => {
    expect(errorHelper({}, 'any.path')).toEqual(undefined);
  });

  it('handles object with data but requested path not found', () => {
    let errors = {
      children: {}
    };
    expect(errorHelper(errors, 'some.path')).toEqual(undefined);
  });

  it('returns errors if found', () => {
    let errors = {
      children: {
        current_password: {
          errors: [
            "This value is invalid"
          ]
        }
      }
    };

    expect(errorHelper(errors, 'children.current_password.errors')).toEqual("This value is invalid");
  });

  it('returns multiple errors if found', () => {
    let errors = {
      children: {
        current_password: {
          errors: [
            "This value is invalid",
            "Some other issue"
          ]
        }
      }
    };

    expect(
      errorHelper(errors, 'children.current_password.errors')
    ).toEqual("This value is invalid, and Some other issue");
  });


  it('handles deeply nested errors', () => {

    let errors = {
      children: {
        current_password: {
          errors: [
            "This value is invalid"
          ]
        },
        plainPassword: {
          children: {
            first: {
              errors: [
                "These do not match"
              ]
            },
            second: {}
          }
        }
      }
    };

    expect(errorHelper(errors, 'children.plainPassword.children.first.errors')).toEqual("These do not match")
  });

});

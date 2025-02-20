// This is a stub version of an sCASP generator for Blockly based
// on the JavaScript generator included with Blockly, which is
// available at https://github.com/google/blockly/blob/master/generators/javascript.js
//
// Some features that were not necessary for Blawx have been excluded,
// such as features dealing with how Blockly keeps track of variables.
// A more formal re-implementation of sCASP as a Blockly language would
// probably require re-implementing this code, and the code generators.

const sCASP = new Blockly.Generator('sCASP');

sCASP.ORDER_ATOMIC = 0;
sCASP.ORDER_NONE = 99;

sCASP.ORDER_OVERRIDES = [];


sCASP.isInitialized = false;

sCASP.init = function (workspace) {
    // Call Blockly.Generator's init.
    Object.getPrototypeOf(this).init.call(this);
    this.isInitialized = true;
}

sCASP.finish = function (code) {
    // Call Blockly.Generator's finish.
    code = Object.getPrototypeOf(this).finish.call(this, code);
    this.isInitialized = false;
    return code
}


// I'm not sure that this is correct in the s(CASP) context, even though
// the equivalent is valid for JavaScript.
sCASP.scrubNakedValue = function (line) {
    return line + '.\n';
};

sCASP.scrub_ = function (block, code, opt_thisOnly) {
    let commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        let comment = block.getCommentText();
        if (comment) {
            comment = Blockly.utils.string.wrap(comment, this.COMMENT_WRAP - 2);
            commentCode += this.prefixLines(comment + '\n', '% ');
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (let i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type === Blockly.inputTypes.VALUE) {
                const childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    comment = this.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += this.prefixLines(comment, '% ');
                    }
                }
            }
        }
    }
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

function text2math(string) {
    switch (string) {
        case "add": return "+";
        case "sub": return "-";
        case "mul": return "*";
        case "div": return "/";
        case "lt": return "<";
        case "lte": return "=<";
        case "gt": return ">";
        case "gte": return ">=";
        case "eq": return "==";
        case "neq": return "\\=";
    }
}

function getCodeForSingleBlock(block) {
    if (!block) {
        return '';
    }
    if (block.disabled) {
        // Skip past this block if it is disabled.
        return getCodeForSingleBlock(block.getNextBlock());
    }

    var func = sCASP[block.type];
    if (typeof func != "function") {
        throw Error("Language JavaScript does not know how to generate code for block type " + block.type);
    }
    // First argument to func.call is the value of 'this' in the generator.
    // Prior to 24 September 2013 'this' was the only way to access the block.
    // The current prefered method of accessing the block is through the second
    // argument to func.call, which becomes the first parameter to the generator.
    var code = func.call(block, block);
    if (typeof code == "array") {
        if (!block.outputConnection || block.outputConnection == "") {
            throw Error("Expecting string from statement block " + block.type);
        }
        return [code[0], code[1]];
    } else if (typeof code == "string") {
        var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
        if (this.STATEMENT_PREFIX) {
            code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\'') +
                code;
        }
        return code;
    } else if (code === null) {
        // Block has handled code generation itself.
        return '';
    } else {
        throw ReferenceError('Invalid code generated: ' + code);
    }
};

sCASP['variable'] = function (block) {
    var text_variable_name = block.getFieldValue('variable_name');
    var code = text_variable_name;
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['silent_variable'] = function (block) {
    var text_variable_name = block.getFieldValue('variable_name');
    var code = '_' + text_variable_name;
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['unnamed_variable'] = function (block) {
    var code = '_';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['variable_assignment'] = function (block) {
    var value_variable = sCASP.valueToCode(block, 'variable', sCASP.ORDER_ATOMIC);
    var value_value = sCASP.valueToCode(block, 'value', sCASP.ORDER_ATOMIC);
    var code = value_variable + ' = ' + value_value;
    return code;
};

sCASP['conjunction'] = function (block) {
    var statements_conjoined_statements = sCASP.statementToCode(block, 'conjoined_statements');
    var code = '...;\n';
    return code;
};

sCASP['disjunction'] = function (block) {
    var statements_disjoined_statements = sCASP.statementToCode(block, 'disjoined_statements');
    var code = '...;\n';
    return code;
};

sCASP['logical_negation'] = function (block) {
    var statements_negated_statement = sCASP.statementToCode(block, 'negated_statement');
    var code = '-' + statements_negated_statement.trim();
    return code;
};

sCASP['default_negation'] = function (block) {
    var statements_default_negated_statement = sCASP.statementToCode(block, 'default_negated_statement');
    var code = 'not ' + statements_default_negated_statement.trim();
    return code;
};

sCASP['comparison'] = function (block) {
    var value_first_comparator = sCASP.valueToCode(block, 'first_comparator', sCASP.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_second_comparator = sCASP.valueToCode(block, 'second_comparator', sCASP.ORDER_ATOMIC);
    var code = value_first_comparator + " " + text2math(dropdown_operator) + " " + value_second_comparator;
    return code;
};

sCASP['fact'] = function (block) {
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_statements = sCASP.statementToCode(block, 'statements');
    var code = "";
    var currentBlock = this.getInputTargetBlock('statements');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock + '.\n';
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['query'] = function (block) {
    var statements_query = sCASP.statementToCode(block, 'query');
    // var code = '?- ' + statements_query + '.\n\n';
    var code = "?- ";
    var currentBlock = this.getInputTargetBlock('query');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock
        currentBlock = currentBlock.getNextBlock();
        if (currentBlock) {
            code += ", "
        }
    }
    code += ".\n"
    return code;

};

sCASP['rule'] = function (block) {
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var statements_conclusion = sCASP.statementToCode(block, 'conclusion');
    var code = '...;\n';
    return code;
};

sCASP['unattributed_rule'] = function (block) {
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var statements_conclusion = sCASP.statementToCode(block, 'conclusion');
    var code = "";
    var currentBlock = this.getInputTargetBlock('conclusion');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        currentBlock = currentBlock.getNextBlock();
        code += codeForBlock;
        if (currentBlock) {
            code += ",\n";
        }
    }
    code += " :- \n";
    currentBlock = this.getInputTargetBlock('conditions');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        currentBlock = currentBlock.getNextBlock();
        code += codeForBlock;
        if (currentBlock) {
            code += ",\n";
        }
    }
    code += ".\n"
    return code;
};

sCASP['legal_doc'] = function (block) {
    var text_legal_doc_name = block.getFieldValue('legal_doc_name');
    var statements_divisions = sCASP.statementToCode(block, 'divisions');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_node'] = function (block) {
    var text_node_name = block.getFieldValue('node_name');
    var statements_sub_parts = sCASP.statementToCode(block, 'sub_parts');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_text'] = function (block) {
    var text_legal_doc_text = block.getFieldValue('legal_doc_text');
    var code = '...;\n';
    return code;
};

sCASP['doc_selector'] = function (block) {
    var value_doc_part_name = block.getFieldValue('doc_part_name');
    var value_section_reference = block.section_reference;
    var code = value_section_reference.toLowerCase();
    // value_doc_part_name.replace(' ','__').replace('.','_').toLowerCase() + "_end";
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['overrules'] = function (block) {
    var value_defeating_rule = sCASP.valueToCode(block, 'defeating_rule', sCASP.ORDER_ATOMIC);
    var value_defeated_rule = sCASP.valueToCode(block, 'defeated_rule', sCASP.ORDER_ATOMIC);
    var code = 'overrules(' + value_defeating_rule + ',' + value_defeated_rule + ')';
    return code;
};

sCASP['object_equality'] = function (block) {
    var value_first_object = sCASP.valueToCode(block, 'first_object', sCASP.ORDER_ATOMIC);
    var value_second_object = sCASP.valueToCode(block, 'second_object', sCASP.ORDER_ATOMIC);
    var code = value_first_object + " = " + value_second_object;
    return code;
};

sCASP['object_disequality'] = function (block) {
    var value_first_object = sCASP.valueToCode(block, 'first_object', sCASP.ORDER_ATOMIC);
    var value_second_object = sCASP.valueToCode(block, 'second_object', sCASP.ORDER_ATOMIC);
    var code = value_first_object + " \\= " + value_second_object;
    return code;
};

sCASP['object_category'] = function (block) {
    var value_object = sCASP.valueToCode(block, 'object', sCASP.ORDER_ATOMIC);
    var value_category = sCASP.valueToCode(block, 'category', sCASP.ORDER_ATOMIC);
    var code = value_category + "(" + value_object + ")";
    return code;
};

sCASP['include'] = function (block) {
    var text_name = block.getFieldValue('NAME');
    var code = '...;\n';
    return code;
};

sCASP['unattributed_fact'] = function (block) {
    // var statements_statements = sCASP.statementToCode(block, 'statements');
    var code = "";
    var currentBlock = this.getInputTargetBlock('statements');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock
        if (!code.endsWith('\n')) {
            code += '.\n';
        }
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['constraint'] = function (block) {
    var value_source = sCASP.valueToCode(block, 'source', sCASP.ORDER_ATOMIC);
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var code = '...;\n';
    return code;
};

sCASP['unattributed_constraint'] = function (block) {
    var statements_conditions = sCASP.statementToCode(block, 'conditions');
    var code = ":- ";
    var currentBlock = this.getInputTargetBlock('conditions');
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        currentBlock = currentBlock.getNextBlock();
        code += codeForBlock;
        if (currentBlock) {
            code += ',\n';
        }
    }
    code += ".\n";
    return code;
};

sCASP['category_declaration'] = function (block) {
    var text_category_name = block.getFieldValue('category_name');
    var code = '';
    var nextblock = block.getNextBlock();
    code += "blawx_category(" + text_category_name + ").\n";
    if (nextblock && nextblock.type == "category_display") {
        var prefix = nextblock.getFieldValue('prefix');
        var postfix = nextblock.getFieldValue('postfix');
        code += "blawx_category_nlg(" + text_category_name + ",\"" + prefix + "\",\"" + postfix + "\").\n"
        code += "#pred " + text_category_name + "(X) :: '";
        code += (prefix.replace(/'/g, '\\\'') + " @(X) " + postfix.replace(/'/g, '\\\'')).trim() + "'.\n";
        code += "#pred according_to(R," + text_category_name + "(X)) :: '";
        code += "according to @(R), " + (prefix.replace(/'/g, '\\\'') + " @(X) " + postfix.replace(/'/g, '\\\'')).trim() + "'.\n";
        code += "#pred legally_holds(_," + text_category_name + "(X)) :: '";
        code += "it legally holds that " + (prefix.replace(/'/g, '\\\'') + " @(X) " + postfix.replace(/'/g, '\\\'')).trim() + "'.\n";
    } else {
        code += '#pred ' + text_category_name + "(X) :: '@(X) is a " + text_category_name.replace(/'/g, '\\\'') + "'.\n";
        code += "#pred according_to(R," + text_category_name + "(X)) :: '";
        code += "according to @(R), @(X) is a " + text_category_name.replace(/'/g, '\\\'') + "'.\n";
        code += "#pred legally_holds(_," + text_category_name + "(X)) :: '";
        code += "it legally holds that @(X) is a " + text_category_name.replace(/'/g, '\\\'') + "'.\n";
    }
    return code;
};

sCASP['category_equivalence'] = function (block) {
    var value_first_category = sCASP.valueToCode(block, 'first_category', sCASP.ORDER_ATOMIC);
    var value_second_category = sCASP.valueToCode(block, 'second_category', sCASP.ORDER_ATOMIC);
    var code = value_second_category + '(X) :- \n' + value_first_category + '(X)';
    return code;
};

sCASP['category_attribute'] = function (block) {
    var value_category = sCASP.valueToCode(block, 'category', sCASP.ORDER_ATOMIC);
    // var statements_attributes = sCASP.statementToCode(block, 'attributes');
    var currentBlock = this.getInputTargetBlock('attributes');
    var code = '';
    while (currentBlock) {
        if (currentBlock.type == "attribute_declaration") {
            var text_attribute_name = currentBlock.getFieldValue('attribute_name');
            // var block_attribute_type = currentBlock.getInputTargetBlock('attribute_type');
            var text_attribute_type = sCASP.valueToCode(currentBlock,'attribute_type', sCASP.ORDER_ATOMIC);
            code += 'blawx_attribute(' + value_category + ',' + text_attribute_name + ',' + text_attribute_type + ').\n';
        }
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += codeForBlock
        if (codeForBlock != "") {
            code += '\n';
        }
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['attribute_declaration'] = function (block) {
    var text_attribute_name = block.getFieldValue('attribute_name');
    var block_attribute_type = block.getInputTargetBlock('attribute_type');
    var code = '';
    var nextblock = block.getNextBlock();
    if (nextblock && nextblock.type == "attribute_display") {
        var order = nextblock.getFieldValue('order');
        var prefix = nextblock.getFieldValue('prefix');
        var infix = nextblock.getFieldValue('infix');
        var postfix = nextblock.getFieldValue('postfix');
        code += "blawx_attribute_nlg(" + text_attribute_name + "," + order + ",\"" + prefix + "\",\"" + infix + "\",\"" + postfix + "\").\n"
        code += "#pred " + text_attribute_name + "(";
        if (order == "ov") {
            code += "X,Y";
        } else {
            code += "Y,X";
        }
        add_code = prefix.replace(/'/g, '\\\'') + " @(X) " + infix.replace(/'/g, '\\\'') + " @(Y) " + postfix.replace(/'/g, '\\\'')
        code += ") :: '" + add_code.trim() + "'.\n"
        code += "#pred according_to(R," + text_attribute_name + "(";
        if (order == "ov") {
            code += "X,Y";
        } else {
            code += "Y,X";
        }
        code += ")) :: 'according to @(R), " + add_code.trim() + "'.\n"
        code += "#pred legally_holds(_," + text_attribute_name + "(";
        if (order == "ov") {
            code += "X,Y";
        } else {
            code += "Y,X";
        }
        code += ")) :: 'it legally holds that " + add_code.trim() + "'.\n"
        if (block_attribute_type.type == "true_false_type_selector") {
            code += "opposes(" + text_attribute_name + "(X,true)," + text_attribute_name + "(X,false)).\n";
            code += "opposes(" + text_attribute_name + "(X,false)," + text_attribute_name + "(X,true)).\n";
        }
    }
    return code;
};

sCASP['attribute_display'] = function (block) {
    // var dropdown_order = block.getFieldValue('order');
    // var text_prefix = block.getFieldValue('prefix');
    // var text_infix = block.getFieldValue('infix');
    // var text_postfix = block.getFieldValue('postfix');
    // // var code = '...;\n';
    return '';
};

sCASP['category_selector'] = function (block) {
    var code = this.getFieldValue('category_name');
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['object_selector'] = function (block) {
    var code = this.getFieldValue('object_name');
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['object_declaration'] = function (block) {
    var text_object_name = block.getFieldValue('object_name');
    var category_name = block.blawxCategoryName;
    var code = category_name + "(" + text_object_name + ")";
    return code;
};

sCASP['category_display'] = function (block) {
    // var dropdown_order = block.getFieldValue('order');
    // var text_prefix = block.getFieldValue('prefix');
    // var text_infix = block.getFieldValue('infix');
    // var text_postfix = block.getFieldValue('postfix');
    var code = '';
    return code;
};

sCASP['true_false_type_selector'] = function (block) {
    var code = 'boolean';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['number_type_selector'] = function (block) {
    var code = 'number';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_type_selector'] = function (block) {
    var code = 'date';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_type_selector'] = function (block) {
    var code = 'duration';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['number_value'] = function (block) {
    var number_value = block.getFieldValue('value');
    var code = number_value;
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['true_value'] = function (block) {
    var code = 'true';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['false_value'] = function (block) {
    var code = 'false';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_value'] = function (block) {
    var number_year = block.getFieldValue('year');
    var number_month = block.getFieldValue('month');
    var number_day = block.getFieldValue('day');
    var code = 'date(' + number_year + ',' + number_month + ',' + number_day + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_value'] = function (block) {
    var dropdown_sign = block.getFieldValue('sign');
    var number_years = block.getFieldValue('years');
    var number_months = block.getFieldValue('months');
    var number_days = block.getFieldValue('days');
    var code = 'duration(' + dropdown_sign + ',' + number_years + ',' + number_months + ',' + number_days + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['calculation'] = function (block) {
    var value_variable = sCASP.valueToCode(block, 'variable', sCASP.ORDER_ATOMIC);
    var value_calculation = sCASP.valueToCode(block, 'calculation', sCASP.ORDER_ATOMIC);
    var code = value_variable + " is " + value_calculation;
    return code;
};

sCASP['math_operation'] = function (block) {
    var value_left_side = sCASP.valueToCode(block, 'left_side', sCASP.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_right_side = sCASP.valueToCode(block, 'right_side', sCASP.ORDER_ATOMIC);
    var code = "( " + value_left_side + " " + text2math(dropdown_operator) + " " + value_right_side + " )";
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_comparison'] = function (block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var dropdown_comparison = block.getFieldValue('comparison');
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    if (dropdown_comparison == "lt") {
        var code = 'before(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "lte") {
        var code = 'not_after(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "gt") {
        var code = 'after(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "gte") {
        var code = 'not_before(' + value_first_date + ',' + value_second_date + ')';
    } else if (dropdown_comparison == "eq") {
        var code = 'eq(' + value_first_date + ',' + value_second_date + ')';
    }
    return code;
};

sCASP['date_element'] = function (block) {
    var dropdown_element = block.getFieldValue('element');
    var value_date = sCASP.valueToCode(block, 'date', sCASP.ORDER_ATOMIC);
    var code = '...';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_calculate'] = function (block) {
    var value_year = sCASP.valueToCode(block, 'year', sCASP.ORDER_ATOMIC);
    var value_month = sCASP.valueToCode(block, 'month', sCASP.ORDER_ATOMIC);
    var value_day = sCASP.valueToCode(block, 'day', sCASP.ORDER_ATOMIC);
    var code = 'date(' + value_year + ',' + value_month + ',' + value_day + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_calculate'] = function (block) {
    var value_sign = sCASP.valueToCode(block, 'sign', sCASP.ORDER_ATOMIC);
    var value_years = sCASP.valueToCode(block, 'years', sCASP.ORDER_ATOMIC);
    var value_months = sCASP.valueToCode(block, 'months', sCASP.ORDER_ATOMIC);
    var value_days = sCASP.valueToCode(block, 'days', sCASP.ORDER_ATOMIC);
    var code = 'duration(' + value_sign + ',' + value_years + ',' +value_months + ',' + value_days + ')';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['duration_element'] = function (block) {
    var dropdown_element = block.getFieldValue('element');
    var value_duration = sCASP.valueToCode(block, 'duration', sCASP.ORDER_ATOMIC);
    var code = '...';
    return [code, sCASP.ORDER_ATOMIC];
};

sCASP['date_difference_days'] = function (block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var value_duration_days = sCASP.valueToCode(block, 'duration_days', sCASP.ORDER_ATOMIC);
    var code = 'days_between(' + value_first_date + ',' + value_second_date + ',' + value_duration_days + ')';
    return code;
};

sCASP['date_difference'] = function (block) {
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var value_duration = sCASP.valueToCode(block, 'duration', sCASP.ORDER_ATOMIC);
    var code = 'date_diff(' + value_first_date + ',' + value_second_date + ',' + value_duration + ')';
    return code;
};

sCASP['date_add'] = function (block) {
    var value_duration = sCASP.valueToCode(block, 'duration', sCASP.ORDER_ATOMIC);
    var value_first_date = sCASP.valueToCode(block, 'first_date', sCASP.ORDER_ATOMIC);
    var value_second_date = sCASP.valueToCode(block, 'second_date', sCASP.ORDER_ATOMIC);
    var code = 'date_add(' + value_first_date + ',' + value_duration + ',' + value_second_date + ')';
    return code;
};

sCASP['numerical_constraint'] = function (block) {
    var value_first_comparator = sCASP.valueToCode(block, 'first_comparator', sCASP.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_second_comparator = sCASP.valueToCode(block, 'second_comparator', sCASP.ORDER_ATOMIC);
    var code = value_first_comparator + " #" + text2math(dropdown_operator) + " " + value_second_comparator;
    return code;
};

sCASP['json_input'] = function (block) {
    var statements_json = sCASP.statementToCode(block, 'json');
    var code = '...;\n';
    return code;
};

sCASP['json_list'] = function (block) {
    var statements_json_list_elements = sCASP.statementToCode(block, 'json_list_elements');
    var code = '...;\n';
    return code;
};

sCASP['json_value'] = function (block) {
    var text_value = block.getFieldValue('value');
    var code = '...;\n';
    return code;
};

sCASP['json_dictionary'] = function (block) {
    var text_predicate = block.getFieldValue('predicate');
    var statements_parameters = sCASP.statementToCode(block, 'parameters');
    var code = '...;\n';
    return code;
};

sCASP['silent_legal_doc_node'] = function (block) {
    var text_node_name = block.getFieldValue('node_name');
    var statements_sub_parts = sCASP.statementToCode(block, 'sub_parts');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_text_continuation'] = function (block) {
    var text_legal_doc_text = block.getFieldValue('legal_doc_text');
    var code = '...;\n';
    return code;
};

sCASP['legal_doc_text_parent_continuation'] = function (block) {
    var text_legal_doc_text = block.getFieldValue('legal_doc_text');
    var code = '...;\n';
    return code;
};

sCASP['attribute_selector'] = function (block) {
    var value_first_element = sCASP.valueToCode(block, 'first_element', sCASP.ORDER_ATOMIC);
    var value_second_element = sCASP.valueToCode(block, 'second_element', sCASP.ORDER_ATOMIC);
    var predicate = this.blawxAttributeName;
    var order = this.blawxAttributeOrder;
    if (order == "ov") {
        first = value_first_element;
        second = value_second_element;
    } else {
        first = value_second_element;
        second = value_first_element;
    }
    var code = predicate + "(" + first + "," + second + ")";
    return code;
};

sCASP['assume'] = function (block) {
    // var statements_statements = sCASP.statementToCode(block, 'statements');
    var currentBlock = this.getInputTargetBlock('statements');
    var code = '';
    while (currentBlock) {
        var codeForBlock = getCodeForSingleBlock(currentBlock);
        code += "#abducible " + codeForBlock + '.\n';
        currentBlock = currentBlock.getNextBlock();
    }
    return code;
};

sCASP['json_textfield'] = function (block) {
    // var text_payload = block.getFieldValue('payload');
    var code = '';
    return code;
};


sCASP['opposes'] = function (block) {
    var statements_first_statement = sCASP.statementToCode(block, 'first_statement');
    var statements_second_statement = sCASP.statementToCode(block, 'second_statement');
    var code = 'opposes(' + statements_first_statement + ',' + statements_second_statement + ').\n';
    code += 'opposes(' + statements_second_statement + ',' + statements_first_statement + ')';
    return code;
};

sCASP['according_to'] = function (block) {
    var value_rule = sCASP.valueToCode(block, 'rule', sCASP.ORDER_ATOMIC);
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var code = 'according_to(' + value_rule + ',' + statements_statement + ')';
    return code;
};

sCASP['scope'] = function (block) {
    var value_name = sCASP.valueToCode(block, 'NAME', sCASP.ORDER_ATOMIC);
    var code = 'not_implemented';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, sCASP.ORDER_NONE];
};

sCASP['holds'] = function (block) {
    var statements_statement = sCASP.statementToCode(block, 'statement');
    var code = 'legally_holds(_,' + statements_statement + ')';
    return code;
};
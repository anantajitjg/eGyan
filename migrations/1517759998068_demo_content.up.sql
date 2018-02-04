INSERT INTO badge_details (badge_id, name, points, badge_logo, badge_description) VALUES (1, 'Member Badge', 0, 'member_badge.png', 'Thank you for becoming a member of eGyan!');
INSERT INTO badge_details (badge_id, name, points, badge_logo, badge_description) VALUES (2, 'Beginner Badge', 50, 'beginner_badge.png', 'Way to go! Keep collecting.');
INSERT INTO badge_details (badge_id, name, points, badge_logo, badge_description) VALUES (3, 'Intermediate Badge', 250, 'intermediate_badge.png', 'You have got this for collecting 250pts');
INSERT INTO badge_details (badge_id, name, points, badge_logo, badge_description) VALUES (4, 'Pro Badge', 500, 'pro_badge.png', 'You have got this for collecting 500pts');
INSERT INTO badge_details (badge_id, name, points, badge_logo, badge_description) VALUES (5, 'Ultimate Badge', 1000, 'ultimate_badge.png', 'You are a champion!');

INSERT INTO course_details (course_id, name, about, syllabus, course_logo, active) VALUES (1, 'Introduction to HTML5', 'This course give you a brief introduction to HTML5. HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It is the fifth and current version of the HTML standard.', '<ul>
    <li>Intro</li>
	<ul><li>Overview</li><li>History</li></ul>
    <li>Basics</li>
	<ul><li>Basic Syntax</li><li>HTML5 Tags (Basic)</li><li>HTML5 form</li></ul>
</ul>', 'html5.png', true);
INSERT INTO course_details (course_id, name, about, syllabus, course_logo, active) VALUES (2, 'Beginning PHP', 'This course gives you a brief introduction to PHP. PHP is a server-side scripting language designed primarily for web development but also used as a general-purpose programming language.', '<ul>
    <li>Overview</li>
	<ul><li>Introduction</li><li>Why PHP?</li><li>Your First PHP file</li></ul>
    <li>Basics</li>
	<ul><li>Basic Syntax</li><li>Types</li><li>Variables</li><li>Constants</li><li>Expressions</li><li>Operators</li><li>Control Structures</li><li>Functions</li></ul>
<li>Forms</li>
<ul><li>HTML form handling</li></ul>
</ul>', 'php.png', true);

INSERT INTO module_details (module_id, module_name, course_id) VALUES (1, 'Intro', 1);
INSERT INTO module_details (module_id, module_name, course_id) VALUES (2, 'Basics', 1);
INSERT INTO module_details (module_id, module_name, course_id) VALUES (3, 'Overview', 2);
INSERT INTO module_details (module_id, module_name, course_id) VALUES (4, 'Basics', 2);
INSERT INTO module_details (module_id, module_name, course_id) VALUES (5, 'Forms', 2);

INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (1, 'Overview', '<p>HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It is the fifth and current version of the HTML standard. It was published in October 2014 by the World Wide Web Consortium (W3C) to improve the language with support for the latest multimedia, while keeping it both easily readable by humans and consistently understood by computers and devices such as web browsers, parsers, etc. HTML5 is intended to subsume not only HTML 4, but also XHTML 1 and DOM Level 2 HTML.</p>', 5, 1);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (2, 'History', '<p>The <strong>Web Hypertext Application Technology Working Group (WHATWG)</strong> began work on the new standard in 2004. At that time, HTML 4.01 had not been updated since 2000, and the World Wide Web Consortium (W3C) was focusing future developments on XHTML 2.0. In 2009, the W3C allowed the XHTML 2.0 Working Group''s charter to expire and decided not to renew it. W3C and WHATWG are currently working together on the development of HTML5.</p>  <p>The Mozilla Foundation and Opera Software presented a position paper at a World Wide Web Consortium (W3C) workshop in June 2004, focusing on developing technologies that are backward compatible with existing browsers, including an initial draft specification of Web Forms 2.0. The workshop concluded with a vote—8 for, 14 against—for continuing work on HTML. Immediately after the workshop, the Web Hypertext Application Technology Working Group (WHATWG) was formed to start work based upon that position paper, and a second draft, Web Applications 1.0, was also announced. <strong><em>The two specifications were later merged to form HTML5</em></strong>. The HTML5 specification was adopted as the starting point of the work of the new HTML working group of the W3C in 2007.</p>  <p>On 14 February 2011, the W3C extended the charter of its HTML Working Group with clear milestones for HTML5. In May 2011, the working group advanced HTML5 to "Last Call", an invitation to communities inside and outside W3C to confirm the technical soundness of the specification. The W3C developed a comprehensive test suite to achieve broad interoperability for the full specification by 2014, which was the target date for recommendation. In January 2011, the WHATWG renamed its "HTML5" living standard to "HTML". The W3C nevertheless continued its project to release HTML5.</p>  <p>In July 2012, WHATWG and W3C decided on a degree of separation. W3C will continue the HTML5 specification work, focusing on a single definitive standard, which is considered as a "snapshot" by WHATWG. The WHATWG organization will continue its work with HTML5 as a "Living Standard". The concept of a living standard is that it is never complete and is always being updated and improved. New features can be added but functionality will not be removed.</p>  <p>In December 2012, W3C designated HTML5 as a Candidate Recommendation. The criterion for advancement to W3C Recommendation is "two 100% complete and fully interoperable implementations".</p>  <p>On 16 September 2014, W3C moved HTML5 to Proposed Recommendation.</p>  <p>On <strong><em>28 October 2014</em></strong>, HTML5 was released as a stable W3C Recommendation, bringing the specification process to completion.</p>  <p>On <strong><em>1 November 2016</em></strong>, HTML5.1 was released as a stable W3C Recommendation.</p>', 5, 1);

INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (3, 'Basic Syntax', '<p>
<pre>
<code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
	&lt;head&gt;
		&lt;meta charset="UTF-8"&gt;
		&lt;title&gt;&lt;/title&gt;
	&lt;/head&gt;
	&lt;body&gt;
	&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>
</p>
<p>&lt;!DOCTYPE html&gt; declares the document type, i.e. html. All the html pages start with &lt;html&gt; and ends with &lt;/html&gt;. The character encoding is specified as, &lt;meta charset="UTF-8"&gt;. Page title is specified inside title tag in head section. Content of the document in body tag.</p>', 10, 2);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (4, 'HTML5 Tags (Basic)', '<h4>Tags that have Semantic Meaning</h4>
<p>Basic Tags and there uses are described below.</p>
<ul>
<li><strong>&lt;header&gt;</strong> - For defining the header of a section/document.</li>
<li><strong>&lt;nav&gt;</strong> - For specifying navigation links.</li>
<li><strong>&lt;article&gt;</strong> - For specifying an article.</li>
<li><strong>&lt;section&gt;</strong> - For specifying a section of a document or an article.</li>
<li><strong>&lt;aside&gt;</strong> - For specifying content aside from the page content.</li>
<li><strong>&lt;footer&gt;</strong> - For specifying footer of a section/document.</li>
</ul>
<img src="/uploads/html5_semantic_tags.png" class="ui medium image" alt="HTML5 semantic tags" />
<h4>Form Elements</h4>
<ul>
<li><strong>&lt;datalist&gt;</strong> - For specifying a list of pre-defined options for input controls.</li>
<li><strong>&lt;keygen&gt;</strong> - Defines a key-pair generator field.</li>
<li><strong>&lt;output&gt;</strong> - Defines the result of a calculation.</li>
</ul>
<h4>Graphics Elements</h4>
<ul>
<li><strong>&lt;canvas&gt;</strong> - Draw graphics using scripting (JavaScript).</li>
<li><strong>&lt;svg&gt;</strong> - Draw scalable vector graphics (svg). Useful for displaying vector based graphics.</li>
</ul>
<h4>Multimedia Elements</h4>
<ul>
<li><strong>&lt;audio&gt;</strong> - Defines audio content.</li>
<li><strong>&lt;embed&gt;</strong> - Defines a container for an external application.</li>
<li><strong>&lt;source&gt;</strong> - Defines multiple media resources for media elements (&lt;video&gt; and &lt;audio&gt;).</li>
<li><strong>&lt;track&gt;</strong> - Defines text tracks for media elements (&lt;video&gt; and &lt;audio&gt;)</li>
<li><strong>&lt;video&gt;</strong> - Defines video.</li>
</ul>', 25, 2);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (5, 'HTML5 form', '<p>In HTML5, form elements and attributes have a greater degree of semantic mark-up than HTML4 and remove the need for tedious scripting and styling that was required in HTML4. The forms features in HTML5 provide a better experience for users by making forms more consistent across different web sites and giving immediate feedback to the user even if scripting is disabled in their browser.</p>
<p>Now, <strong>&lt;input&gt;</strong> element has new values for the type attribute. Some of these type attribute values are, <strong>email</strong> (The element represents email address), <strong>search</strong> (The element represents search entry field), <strong>tel</strong> (the element represents a control for editing a telephone number. You can use attributes such as <em>pattern</em> and <em>maxlength</em> to restrict values entered in the control), <strong>url</strong> (The element represents a control for editing a URL).
<p>The <strong>&lt;input&gt;</strong> element also has new attributes. Some of these are, <strong>list</strong> (The ID of a &lt;datalist&gt; element whose content, &lt;option&gt; elements, are to be used as hints and are displayed as proposals in the suggestion area of the input field), <strong>pattern</strong> (A regular expression that the control&#8217;s value is checked against, which can be used with type values of text, tel, search, url, and email), <strong>form</strong> (A string indicating which &lt;form&gt; element this input is part of. An input can only be in one form), <strong>formmethod</strong> (A string indicating which HTTP method (GET or POST) should be used when submitting; it overrides the method of the &lt;form&gt; element, if defined. The formmethod only applies when the type is image or submit, and the form attribute has been set).
<p>Various attributes are also available for other form elements. The <strong>placeholder</strong> attribute on &lt;input&gt; and &lt;textarea&gt; elements provides a hint to the user of what can be entered in the field. The placeholder text must not contain carriage returns or line-feeds. The <strong>autofocus</strong> attribute lets you specify that a form control should have input focus when the page loads, unless the user overrides it, for example by typing in a different control.</p>
<p>HTML5 provides syntax and API items to support client-side validation of forms. While this functionality does not replace server-side validation, which is still necessary for security and data integrity, client-side validation can support a better user experience by giving the user immediate feedback about the input data. One such example is the <strong>required</strong> attribute (specifies that the user must fill in a value before submitting a form).</p>', 10, 2);

INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (6, 'Introduction', '<p>PHP (recursive acronym for PHP: Hypertext Preprocessor) is a widely-used open source general-purpose scripting language that is especially suited for web development and can be embedded into HTML. What distinguishes PHP from something like client-side JavaScript (client-side scripting language) is that the <strong>code is executed on the server</strong> (server-side scripting language), generating HTML which is then sent to the client. The client would receive the results of running that script, but would not know what the underlying code was.</p> <p>There are three main areas where PHP scripts are used.</p> <div class="ui relaxed divided list">   <div class="item">     <div class="content"><div class="header">Server-side scripting</div><div class="description">This is the most traditional and main target field for PHP. You need three things to make this work: the <strong>PHP parser</strong> (CGI or server module), <strong>a web server</strong> and a <strong>web browser</strong>. You need to run the web server, with a connected PHP installation. You can access the PHP program output with a web browser, viewing the PHP page through the server. Refer <strong>Note</strong> for installing PHP on your computer.</div></div>   </div>   <div class="item">     <div class="content"><div class="header">Command line scripting</div><div class="description">You can make a PHP script to run it without any server or browser. You only need the PHP parser to use it this way. This type of usage is ideal for scripts regularly executed using cron (on *nix or Linux) or Task Scheduler (on Windows). These scripts can also be used for simple text processing tasks.</div></div>   </div>   <div class="item">     <div class="content"><div class="header">Writing desktop applications</div><div class="description">PHP is probably not the very best language to create a desktop application with a graphical user interface, but if you know PHP very well, and would like to use some advanced PHP features in your client-side applications you can also use PHP-GTK to write such programs. You also have the ability to write cross-platform applications this way.</div></div>   </div> </div> <div class="ui teal segment"> <h5>Note:</h5> <p>To install PHP on your home, install PHP development environment. One of the most popular one is <a href="https://www.apachefriends.org/index.html" target="_blank"><strong>XAMPP</strong></a>.</p> </div>', 10, 3);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (7, 'Why PHP?', '<ul> <li>You can use PHP to write cross-platform applications.i.e. It can be used on all major operating systems, including Linux, many Unix variants (including HP-UX, Solaris and OpenBSD), Microsoft Windows, Mac OS X, RISC OS, and probably others.</li> <li>It is completely free.</li> <li>The best things in using PHP are that it is extremely simple for a newcomer, but offers many advanced features for a professional programmer.</li> <li>You have the choice of using procedural programming or object oriented programming (OOP), or a mixture of both.</li> <li>It supports various databases.</li> <li>It is compatible with almost all servers used today (Apache, IIS, etc.)</li> <li>PHP&#8217;s other abilities includes outputting images, PDF files and even Flash movies (using libswf and Ming) generated on the fly.</li> </ul>', 5, 3);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (8, 'Your First PHP file', '<p>PHP files have extension <em>.php</em>. Below example is a simple PHP file that can output a paragraph, containing a text, <em>Hello World!</em></p>
<pre><code>
&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;First PHP file&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
       &lt;?php echo "&lt;p&gt;Hello World!&lt;/p&gt;"; ?&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<div class="ui teal segment">
<h5>Note:</h5>
<p>If you have setup XAMPP; Run Apache, then go to root directory where you have setup XAMPP. Go inside htdocs directory, then save the above file as first.php. Then open your favorite web browser, then go to this url: <em>http://localhost/first.php</em></p>
</div>', 10, 3);

INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (9, 'Basic syntax', '<p>When PHP parses a file, it looks for opening and closing tags, which are <strong>&lt;?php</strong> and <strong>?&gt;</strong> which tell PHP to start and stop interpreting the code between them. Parsing in this manner allows PHP to be embedded in all sorts of different documents, as <em><strong>everything outside of a pair of opening and closing tags is ignored by the PHP parser</strong></em>.</p>
<pre><code>
&lt;?php
	//php code
?&gt; 
</code></pre>
<p>In the above code <em>//</em> indicates a single line comment. It will not be executed as part of program. Comments are a greater way to explain your code. For multi-line comment, <code>/* comments here */</code>, can be used. When you are writing php codes always make sure to <strong>end php statements with a semicolon</strong>. For example, <code>&lt;?php echo "Hello World!"; ?&gt;</code>. <strong>echo</strong> statement in php is used to output data to the screen.</p>
<div class="ui teal segment">
<h5>Note:</h5>
<p>If a file is pure PHP code, it is preferable to omit the PHP closing tag at the end of the file. This prevents accidental whitespace or new lines being added after the PHP closing tag, which may cause unwanted effects.</p>
</div>', 10, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (10, 'Types', '<p>PHP supports ten primitive types.</p>
<p>Four scalar types:</p>
<ul><li><strong>boolean</strong> (It can be either TRUE or FALSE)</li><li><strong>integer</strong> (non-decimal number between -2,147,483,648 and 2,147,483,647)</li><li><strong>float</strong> (Floating point numbers, also known as "floats", "doubles", or "real numbers")</li><li><strong>string</strong> (sequence of characters; for example, "Hello World!")</li></ul>
<p>Four compound types:</p>
<ul><li><strong>array</strong> (An array in PHP is actually an ordered map. A map is a type that associates values to keys.)</li><li><strong>object</strong> (An individual instance of the data structure defined by a class. You define a class once and then make many objects that belong to it. Objects are also known as instance.)</li><li><strong>callable</strong> (Callbacks can be denoted by callable type hint as of PHP 5.4)</li><li><strong>iterable</strong> (Iterable is a pseudo-type introduced in PHP 7.1. Iterable can be used as a parameter type to indicate that a function requires a set of values, but does not care about the form of the value set since it will be used with foreach.)</li></ul>
<p>And finally two special types:</p>
<ul><li><strong>resource</strong> (A resource is a special variable, holding a reference to an external resource. Resources are created and used by special functions.)</li><li><strong>NULL</strong> (The special NULL value represents a variable with no value. NULL is the only possible value of type null.)</li></ul>', 5, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (11, 'Variables', '<p>Variables in PHP are represented by a <strong>dollar sign followed by the name of the variable</strong>. The variable name is case-sensitive. A valid variable name starts with a letter or underscore, followed by any number of letters, numbers, or underscores. For example, </p>
<pre><code>
&lt;?php
	$course="Beginning PHP";
?&gt;
</code></pre>
<p> By default, variables are always <strong>assigned by value</strong>. That is to say, when you assign an expression to a variable, the entire value of the original expression is copied into the destination variable. This means, for instance, that after assigning one variable&#8217;s value to another, changing one of those variables will have no effect on the other.</p>
<p>PHP also offers another way to assign values to variables: <strong>assign by reference</strong>. This means that the new variable simply references (in other words, "becomes an alias for" or "points to") the original variable. Changes to the new variable affect the original, and vice versa. To assign by reference, simply prepend an ampersand (&) to the beginning of the variable which is being assigned (the source variable).</p>', 5, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (12, 'Constants', '<p>A constant is an identifier (name) for a simple value. As the name suggests, that value cannot change during the execution of the script. A constant is case-sensitive by default. By convention, constant identifiers are always uppercase. A valid constant name starts with a letter or underscore, followed by any number of letters, numbers, or underscores. You can access constants anywhere in your script without regard to scope. To create a constant, use the define() function. For example, </p>
<pre><code>
&lt;?php
	define("ENV","development");
?&gt;
</code></pre>', 5, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (13, 'Expressions', '<p>Expressions are the most important building blocks of PHP. In PHP, almost anything you write is an expression. The simplest yet most accurate way to define an expression is "anything that has a value".</p>  <p>The most basic forms of expressions are constants and variables. When you type "$a = 5", you&#8217;re assigning &#8217;5&#8217; into $a. &#8217;5&#8217;, obviously, has the value 5, or in other words &#8217;5&#8217; is an expression with the value of 5 (in this case, &#8217;5&#8217; is an integer constant).</p>  <p>After this assignment, you&#8217;d expect $a&#8217;s value to be 5 as well, so if you wrote $b = $a, you&#8217;d expect it to behave just as if you wrote $b = 5. In other words, $a is an expression with the value of 5 as well. If everything works right, this is exactly what will happen.</p>', 5, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (14, 'Operators', '<p>An operator is something that takes one or more values (or expressions, in programming jargon) and yields another value (so that the construction itself becomes an expression).</p>
<h5>1. Arithmetic Operators</h5>
<table class="ui basic table"><thead><tr><th>Example</th><th>Name</th><th>Result</th></tr></thead><tbody><tr><td>+$a</td><td>Identity</td><td>Conversion of <var><var>$a</var></var> to int or float as appropriate.</td></tr><tr><td>-$a</td><td>Negation</td><td>Opposite of <var><var>$a</var></var>.</td></tr><tr><td>$a + $b</td><td>Addition</td><td>Sum of <var><var>$a</var></var> and <var><var>$b</var></var>.</td></tr><tr><td>$a - $b</td><td>Subtraction</td><td>Difference of <var><var>$a</var></var> and <var><var>$b</var></var>.</td></tr><tr><td>$a * $b</td><td>Multiplication</td><td>Product of <var><var>$a</var></var> and <var><var>$b</var></var>.</td></tr><tr><td>$a / $b</td><td>Division</td><td>Quotient of <var><var>$a</var></var> and <var><var>$b</var></var>.</td></tr><tr><td>$a % $b</td><td>Modulo</td><td>Remainder of <var><var>$a</var></var> divided by <var><var>$b</var></var>.</td></tr><tr><td>$a ** $b</td><td>Exponentiation</td><td>Result of raising <var><var>$a</var></var> to the <var><var>$b</var></var>&#8217;th power.</td></tr></tbody></table>
<h5>2. Assignment Operators</h5>
<p>The basic assignment operator is <strong>"="</strong>. The value of an assignment expression is the value assigned. That is, the value of "$a = 3" is 3. In addition to the basic assignment operator, there are <strong>"combined operators"</strong> for all of the binary arithmetic, array union and string operators that allow you to use a value in an expression and then set its value to the result of that expression. For example,
<pre><code>
&lt;?php

$a = 3;
$a += 5; // sets $a to 8, as if we had said: $a = $a + 5;
$b = "Hello ";
$b .= "There!"; // sets $b to "Hello There!", just like $b = $b . "There!";

?&gt;
</code></pre>
</p>
<h5>3. Bitwise Operators</h5>
<p>Bitwise operators allow evaluation and manipulation of specific bits within an integer.</p>
<table class="ui basic table"><thead><tr><th>Example</th><th>Name</th><th>Result</th></tr></thead><tbody><tr><td><strong><code>$a &amp; $b</code></strong></td><td>And</td><td>Bits that are set in both <var><var>$a</var></var> and <var><var>$b</var></var> are set.</td></tr><tr><td><strong><code>$a | $b</code></strong></td><td>Or (inclusive or)</td><td>Bits that are set in either <var><var>$a</var></var> or <var><var>$b</var></var> are set.</td></tr><tr><td><strong><code>$a ^ $b</code></strong></td><td>Xor (exclusive or)</td><td>Bits that are set in <var><var>$a</var></var> or <var><var>$b</var></var> but not both are set.</td></tr><tr><td><strong><code>~ $a</code></strong></td><td>Not</td><td>Bits that are set in <var><var>$a</var></var> are not set, and vice versa.</td></tr><tr><td><strong><code>$a &lt;&lt; $b</code></strong></td><td>Shift left</td><td>Shift the bits of <var><var>$a</var></var> <var><var>$b</var></var> steps to the left (each step means "multiply by two")</td></tr><tr><td><strong><code>$a &gt;&gt; $b</code></strong></td><td>Shift right</td><td>Shift the bits of <var><var>$a</var></var> <var><var>$b</var></var> steps to the right (each step means "divide by two")</td></tr></tbody></table>
<h5>4. Comparison Operators</h5>
<table class="ui basic table"><thead><tr><th>Example</th><th>Name</th><th>Result</th></tr></thead><tbody><tr><td>$a == $b</td><td>Equal</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is equal to <var><var>$b</var></var> after type juggling.</td></tr><tr><td>$a === $b</td><td>Identical</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is equal to <var><var>$b</var></var>, and they are of the same type.</td></tr><tr><td>$a != $b</td><td>Not equal</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not equal to <var><var>$b</var></var> after type juggling.</td></tr><tr><td>$a &lt;&gt; $b</td><td>Not equal</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not equal to <var><var>$b</var></var> after type juggling.</td></tr><tr><td>$a !== $b</td><td>Not identical</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not equal to <var><var>$b</var></var>, or they are not of the same type.</td></tr><tr><td>$a &lt; $b</td><td>Less than</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is strictly less than <var><var>$b</var></var>.</td></tr><tr><td>$a &gt; $b</td><td>Greater than</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is strictly greater than <var><var>$b</var></var>.</td></tr><tr><td>$a &lt;= $b</td><td>Less than or equal to</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is less than or equal to <var><var>$b</var></var>.</td></tr><tr><td>$a &gt;= $b</td><td>Greater than or equal to</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is greater than or equal to <var><var>$b</var></var>.</td></tr><tr><td>$a &lt;=&gt; $b</td><td>Spaceship</td><td>An integer less than, equal to, or greater than zero when <var><var>$a</var></var> is respectively less than, equal to, or greater than <var><var>$b</var></var> (PHP 7).</td></tr></tbody></table>
<h5>5. Incrementing/Decrementing Operators</h5>
<table class="ui basic table"><thead><tr><th>Example</th><th>Name</th><th>Effect</th></tr></thead><tbody><tr><td>++$a</td><td>Pre-increment</td><td>Increments <var><var>$a</var></var> by one, then returns <var><var>$a</var></var>.</td></tr><tr><td>$a++</td><td>Post-increment</td><td>Returns <var><var>$a</var></var>, then increments <var><var>$a</var></var> by one.</td></tr><tr><td>--$a</td><td>Pre-decrement</td><td>Decrements <var><var>$a</var></var> by one, then returns <var><var>$a</var></var>.</td></tr><tr><td>$a--</td><td>Post-decrement</td><td>Returns <var><var>$a</var></var>, then decrements <var><var>$a</var></var> by one.</td></tr></tbody></table>
<h5>7. Logical Operators</h5>
<table class="ui basic table"><thead><tr><th>Example</th><th>Name</th><th>Result</th></tr></thead><tbody><tr><td>$a and $b</td><td>And</td><td><strong><code>TRUE</code></strong> if both <var><var>$a</var></var> and <var><var>$b</var></var> are <strong><code>TRUE</code></strong>.</td></tr><tr><td>$a or $b</td><td>Or</td><td><strong><code>TRUE</code></strong> if either <var><var>$a</var></var> or <var><var>$b</var></var> is <strong><code>TRUE</code></strong>.</td></tr><tr><td>$a xor $b</td><td>Xor</td><td><strong><code>TRUE</code></strong> if either <var><var>$a</var></var> or <var><var>$b</var></var> is <strong><code>TRUE</code></strong>, but not both.</td></tr><tr><td>! $a</td><td>Not</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not <strong><code>TRUE</code></strong>.</td></tr><tr><td>$a &amp;&amp; $b</td><td>And</td><td><strong><code>TRUE</code></strong> if both <var><var>$a</var></var> and <var><var>$b</var></var> are <strong><code>TRUE</code></strong>.</td></tr><tr><td>$a || $b</td><td>Or</td><td><strong><code>TRUE</code></strong> if either <var><var>$a</var></var> or <var><var>$b</var></var> is <strong><code>TRUE</code></strong>.</td></tr></tbody></table>
<h5>8. String Operators</h5>
<p>There are two string operators. The first is the <strong>concatenation operator, "<em>.</em>"</strong>, which returns the concatenation of its right and left arguments. The second is the <strong>concatenating assignment operator, "<em>.=</em>"</strong>, which appends the argument on the right side to the argument on the left side.</p>
<h5>9. Array Operators</h5>
<table class="ui basic table"><thead><tr><th>Example</th><th>Name</th><th>Result</th></tr></thead><tbody><tr><td>$a + $b</td><td>Union</td><td>Union of <var><var>$a</var></var> and <var><var>$b</var></var>.</td></tr><tr><td>$a == $b</td><td>Equality</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> and <var><var>$b</var></var> have the same key/value pairs.</td></tr><tr><td>$a === $b</td><td>Identity</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> and <var><var>$b</var></var> have the same key/value pairs in the same order and of the same types.</td></tr><tr><td>$a != $b</td><td>Inequality</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not equal to <var><var>$b</var></var>.</td></tr><tr><td>$a &lt;&gt; $b</td><td>Inequality</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not equal to <var><var>$b</var></var>.</td></tr><tr><td>$a !== $b</td><td>Non-identity</td><td><strong><code>TRUE</code></strong> if <var><var>$a</var></var> is not identical to <var><var>$b</var></var>.</td></tr></tbody></table>', 15, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (15, 'Control Structures', '<p>In a program, a control structure determines the order in which statements are executed.</p>
<h4>if</h4>
<p>The if construct is one of the most important features of many languages, PHP included. It allows for conditional execution of code fragments. PHP features an if structure that is similar to that of C:</p>
<pre><code>
if (expr)
  statement
</code></pre>
<p><strong>Example: </strong></p>
<p>The following example would display a is bigger than b if $a is bigger than $b</p>
<pre><code>
&lt;?php
if ($a &gt; $b)
  echo "a is bigger than b";
?&gt;
</code></pre>
<h4>else</h4>
<p>Often you&#8217;d want to execute a statement if a certain condition is met, and a different statement if the condition is not met. This is what else is for.</p>
<p><strong>Example: </strong></p>
<p>following code would display a is greater than b if $a is greater than $b, and a is NOT greater than b otherwise:</p>
<pre><code>
&lt;?php
if ($a &gt; $b) {
  echo "a is greater than b";
} else {
  echo "a is NOT greater than b";
}
?&gt;
</code></pre>
<h4>elseif/else if</h4>
<p>elseif, as its name suggests, is a combination of if and else. Like else, it extends an if statement to execute a different statement in case the original if expression evaluates to FALSE. However, unlike else, it will execute that alternative expression only if the elseif conditional expression evaluates to TRUE.</p>
<p><strong>Example: </strong></p>
<p>For example, the following code would display a is bigger than b, a equal to b or a is smaller than b:</p>
<pre><code>
&lt;?php
if ($a &gt; $b) {
    echo "a is bigger than b";
} elseif ($a == $b) {
    echo "a is equal to b";
} else {
    echo "a is smaller than b";
}
?&gt;
</code></pre>
<h4>while</h4>
<p>while loops are the simplest type of loop in PHP. They behave just like their C counterparts. The basic form of a while statement is:</p>
<pre><code>
while (expr)
    statement
</code></pre>
<h4>do-while</h4>
<p>do-while loops are very similar to while loops, except the truth expression is checked at the end of each iteration instead of in the beginning. The main difference from regular while loops is that the first iteration of a do-while loop is guaranteed to run. The syntax of a do-while loop is:</p>
<pre><code>
do {
    code;
} while (condition is true);
</code></pre>
<h4>for</h4>
<p>for loops are the most complex loops in PHP. They behave like their C counterparts. The syntax of a for loop is:</p>
<pre><code>
for (expr1; expr2; expr3)
    statement
</code></pre>
<p>The first expression (expr1) is evaluated (executed) once unconditionally at the beginning of the loop. In the beginning of each iteration, expr2 is evaluated. If it evaluates to TRUE, the loop continues and the nested statement(s) are executed. If it evaluates to FALSE, the execution of the loop ends. At the end of each iteration, expr3 is evaluated (executed).</p>
<p><strong>Example: </strong></p>
<p>following example displays number 1 to 10</p>
<pre><code>
&lt;?php
for ($i = 1; $i <= 10; $i++) {
    echo $i;
}
?&gt;
</code></pre>
<h4>foreach</h4>
<p>The foreach construct provides an easy way to iterate over arrays. foreach works only on arrays and objects, and will issue an error when you try to use it on a variable with a different data type or an uninitialized variable. There are two syntaxes:</p>
<pre><code>
foreach (array_expression as $value)
    statement
</code></pre>
<pre><code>
foreach (array_expression as $key => $value)
    statement
</code></pre>
<h4>switch</h4>
<p>The switch statement is similar to a series of IF statements on the same expression. In many occasions, you may want to compare the same variable (or expression) with many different values, and execute a different piece of code depending on which value it equals to. This is exactly what the switch statement is for.</p>
<p><strong>Example: switch structure</strong></p>
<pre><code>
&lt;?php
switch ($i) {
    case 0:
        echo "i equals 0";
        break;
    case 1:
        echo "i equals 1";
        break;
    case 2:
        echo "i equals 2";
        break;
}
?&gt;
</code></pre>', 20, 4);
INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (16, 'Functions', '<h4>User-defined functions</h4>
<p>A function may be defined using syntax such as the following:</p>
<pre><code>
&lt;?php
function foo($arg_1, $arg_2, /* ..., */ $arg_n)
{
    echo "Example";
    return $retval;
}
?&gt;
</code></pre>
<p>In the above example, $arg_1, $arg_2, /* ..., */ $arg_n represents <strong>argument list</strong>. Information may be passed to functions via the argument list, which is a comma-delimited list of expressions. The arguments are evaluated from left to right. $retval represents the returning value of the function. Values are returned by using the optional <strong>return statement</strong>. Any type may be returned, including arrays and objects. This causes the function to end its execution immediately and pass control back to the line from which it was called. Any valid PHP code may appear inside a function, even other functions and class definitions.</p>
<h4>Internal (built-in) functions</h4>
<p>PHP comes standard with many functions and constructs. There are also functions that require specific PHP extensions compiled in, otherwise fatal "undefined function" errors will appear. For example, to use image functions such as imagecreatetruecolor(), PHP must be compiled with GD support. Or, to use mysql_connect(), PHP must be compiled with MySQL support. There are many core functions that are included in every version of PHP, such as the string and variable functions. A call to phpinfo() or get_loaded_extensions() will show which extensions are loaded into PHP.</p>
<div class="ui teal segment">
<h5>Note:</h5>
<p>PHP does not support function overloading, nor is it possible to undefine or redefine previously-declared functions.</p>
</div>', 15, 4);

INSERT INTO topic_details (topic_id, topic_name, topic_content, topic_points, module_id) VALUES (17, 'HTML form handling', '<p>One of the most powerful features of PHP is the way it handles HTML forms. The basic concept that is important to understand is that any form element will automatically be available to your PHP scripts. i.e. When a form is submitted to a PHP script, the information from that form is readily available. There are few ways to access this information, for example:</p>
<p><strong>Example:</strong> A simple HTML form for login</p>
<pre><code>
form action=&quot;home.php&quot; method=&quot;POST&quot;&gt;
 &lt;p&gt;Username: &lt;input type=&quot;text&quot; name=&quot;username&quot; /&gt;&lt;/p&gt;
 &lt;p&gt;Password: &lt;input type=&quot;password&quot; name=&quot;pass&quot; /&gt;&lt;/p&gt;
 &lt;p&gt;&lt;input type=&quot;submit&quot; value=&quot;Login&quot; /&gt;&lt;/p&gt;
&lt;/form&gt;
</code></pre>
<p>When the user fills in this form and hits the submit button, the home.php page is called. In this file you would write something like this:</p>
<p><em>home.php</em></p>
<pre><code>
Welcome &lt;?php echo htmlspecialchars($_POST[&#8217;username&#8217;]); ?&gt;.
</code></pre>
<p>Apart from the <em>htmlspecialchars()</em> it should be obvious what this does. <em>htmlspecialchars()</em> makes sure any characters that are special in html are properly encoded so people can&#8217;t inject HTML tags or Javascript into your page. The <strong>$_POST[&#8217;username&#8217;]</strong> variable will be automatically set for you by PHP. You don&#8217;t want to print the user password, right? you can store password using, <strong>$_POST[&#8217;pass&#8217;]</strong>. $_POST is a superglobal which contains all POST data. Notice how the <em>method of our form is POST</em>. If we used the <em>method GET</em> then our form information would live in the <strong>$_GET superglobal</strong> instead (Remember that, when you want to submit some sensitive information such as password, never use the GET method). You may also use the $_REQUEST superglobal, if you do not care about the source of your request data. It contains the merged information of GET, POST and COOKIE data.</p>
<p>Using a GET form is similar except you&#8217;ll use the appropriate GET predefined variable instead. GET also applies to the QUERY_STRING (the information after the &#8217;?&#8217; in a URL). So, for example, http://www.example.com/page.php?id=1 contains GET data which is accessible with $_GET[&#8217;id&#8217;].</p>
<div class="ui teal segment">
<h5>Note:</h5>
<p><strong>Superglobals</strong> — Superglobals are built-in variables that are always available in all scopes.</p>
</div>', 30, 5);
